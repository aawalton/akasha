import { expect, test } from "bun:test"
import type { Ran } from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import {
  asked,
  howOf,
  PUT_RIGHT,
  type Starting,
  startedOver,
} from "akasha/infrastructure/services/workstations/service-restarting/service-restarting.module.code.ts"

const UNIT = "kept.service"

const OTHER = "kept-again.service"

const TIMER = "kept.timer"

const RESTARTED = "try-restart"

const WHY = "`ExecStart` changed"

function asking(refuse: readonly string[] = []): {
  readonly calls: readonly (readonly string[])[]
  readonly run: (args: readonly string[]) => Ran
} {
  const calls: (readonly string[])[] = []
  return {
    calls,
    run: (args) => {
      calls.push([...args])
      if (refuse.includes(args.join(" "))) return { code: 1, out: "systemctl would not" }
      return { code: 0, out: "" }
    },
  }
}

function one(unit: string = UNIT): readonly Starting[] {
  return [{ unit, why: WHY }]
}

test("a start asked for is taken at once and systemd is asked nothing else", () => {
  const { calls, run } = asking()

  const said = startedOver(run, one())

  expect(said.wrong).toEqual([])
  expect(said.said).toEqual([`started ${UNIT} again — ${WHY}`])
  expect(calls).toEqual([[RESTARTED, UNIT]])
})

test("every unit named is asked for, in the order it was named", () => {
  const { calls, run } = asking()
  const both: readonly Starting[] = [
    { unit: UNIT, why: WHY },
    { unit: OTHER, why: WHY },
  ]

  expect(startedOver(run, both).said).toEqual([
    `started ${UNIT} again — ${WHY}`,
    `started ${OTHER} again — ${WHY}`,
  ])
  expect(calls).toEqual([
    [RESTARTED, UNIT],
    [RESTARTED, OTHER],
  ])
})

test("a timer is armed rather than started, arming ending no work", () => {
  const { calls, run } = asking()

  expect(startedOver(run, one(TIMER)).said).toEqual([`armed ${TIMER} again — ${WHY}`])
  expect(howOf(TIMER)).toBe("armed")
  expect(howOf(UNIT)).toBe("started")
  expect(calls).toEqual([[RESTARTED, TIMER]])
})

test("a start that refuses is said as wrong, names what puts it right, and the rest are asked", () => {
  const { calls, run } = asking([`${RESTARTED} ${UNIT}`])
  const both: readonly Starting[] = [
    { unit: UNIT, why: WHY },
    { unit: OTHER, why: WHY },
  ]

  const said = startedOver(run, both)

  expect(said.wrong.join("")).toContain(`${UNIT} runs as it did`)
  expect(said.wrong.join("")).toContain(PUT_RIGHT)
  expect(said.said).toEqual([`started ${OTHER} again — ${WHY}`])
  expect(calls).toEqual([
    [RESTARTED, UNIT],
    [RESTARTED, OTHER],
  ])
})

test("a systemctl that throws is said as wrong rather than thrown", () => {
  const thrown = (): Ran => {
    throw new Error("dbus went away mid-start")
  }

  const said = startedOver(thrown, one())

  expect(said.said).toEqual([])
  expect(said.wrong.join("")).toContain("dbus went away")
  expect(asked(thrown, []).code).not.toBe(0)
})

test("nothing asked for asks systemd nothing", () => {
  const { calls, run } = asking()

  expect(startedOver(run, [])).toEqual({ said: [], wrong: [] })
  expect(calls).toEqual([])
})
