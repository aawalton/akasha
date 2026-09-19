import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import type { SeatPresence } from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"
import {
  agentsWithNoOne,
  presenceStated,
} from "akasha/agent/seat/stopping/modules/absent-sweeping/absent-sweeping.module.code.ts"

const alwaysGone = (): SeatPresence => "absent"

const alwaysThere = (): SeatPresence => "present"

const alwaysUnknown = (): SeatPresence => "unknown"

test("a seat whose process is gone is named", () => {
  expect(agentsWithNoOne([["one", "10-20"]], alwaysGone)).toEqual(["one"])
})

test("a seat whose process is there is not named", () => {
  expect(agentsWithNoOne([["one", "10-20"]], alwaysThere)).toEqual([])
})

test("a seat whose process cannot be read is not named", () => {
  expect(agentsWithNoOne([["one", "10-20"]], alwaysUnknown)).toEqual([])
})

test("a seat stating no process is not named", () => {
  expect(
    agentsWithNoOne(
      [
        ["one", null],
        ["two", ""],
      ],
      alwaysGone
    )
  ).toEqual([])
})

test("a process that is no key reads as unknown rather than as gone", () => {
  expect(presenceStated("not-a-key-at-all")).toBe("unknown")
})

test("a pid nothing runs under reads as gone", () => {
  expect(presenceStated("999999999-1")).toBe("absent")
})

test("this very process reads as present", () => {
  const raw = readFileSync(`/proc/${process.pid}/stat`, "utf8")
  const ticks = raw.slice(raw.lastIndexOf(")") + 2).split(" ")[19]
  expect(presenceStated(`${process.pid}-${ticks}`)).toBe("present")
})

test("this pid under other ticks reads as gone, so a recycled pid is no agent", () => {
  expect(presenceStated(`${process.pid}-1`)).toBe("absent")
})
