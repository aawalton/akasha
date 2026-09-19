import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import type { SeatPresence } from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"
import {
  agentsWithNoOne,
  presenceStated,
} from "akasha/agent/seat/stopping/modules/absent-sweeping/absent-sweeping.module.code.ts"

const ALWAYS_GONE = (): SeatPresence => "absent"

const ALWAYS_THERE = (): SeatPresence => "present"

const ALWAYS_UNKNOWN = (): SeatPresence => "unknown"

test("a seat whose process is gone is named", () => {
  expect(agentsWithNoOne([["one", "10-20"]], ALWAYS_GONE)).toEqual(["one"])
})

test("a seat whose process is there is not named", () => {
  expect(agentsWithNoOne([["one", "10-20"]], ALWAYS_THERE)).toEqual([])
})

test("a seat whose process cannot be read is not named", () => {
  expect(agentsWithNoOne([["one", "10-20"]], ALWAYS_UNKNOWN)).toEqual([])
})

test("a seat stating no process is not named", () => {
  expect(
    agentsWithNoOne(
      [
        ["one", null],
        ["two", ""],
      ],
      ALWAYS_GONE
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
