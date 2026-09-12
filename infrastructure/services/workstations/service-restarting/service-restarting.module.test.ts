import { afterAll, expect, test } from "bun:test"
import { existsSync, realpathSync, writeFileSync } from "node:fs"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import type { Ran } from "akasha/infrastructure/services/workstations/service-installing/service-installing.module.code.ts"
import {
  asked,
  cameUpFor,
  cameUpIn,
  KEPT_MINUTES,
  type Keeping,
  keptBack,
  keptOver,
  keptSaid,
  type Owed,
  owedAt,
  owedIn,
  owedOff,
  owedOn,
  owedRead,
  owedSaid,
  owedWrite,
  PUT_RIGHT,
  type Starting,
  startedOver,
} from "akasha/infrastructure/services/workstations/service-restarting/service-restarting.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const UNIT = "kept.service"

const OTHER = "kept-again.service"

const TIMER = "kept.timer"

const RESTARTED = "try-restart"

const ASKED = ["show", "--timestamp=unix", "-p", "Id", "-p", "ActiveEnterTimestamp"]

const COMMIT = "f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1"

const A_MINUTE = 60_000

const A_DAY = 1440 * A_MINUTE

const NOW = Date.parse("2026-09-12T06:00:00.000Z")

const THEN = "2026-09-12T05:00:00.000Z"

const WHY = "the code it runs changed at `kept/kept.module.code.ts`"

function homeFor(): string {
  return realpathSync(scratch.rootFor("akasha-service-restarting-"))
}

function taking(given: {
  readonly up?: Readonly<Record<string, number>>
  readonly refuse?: readonly string[]
}): {
  readonly calls: readonly (readonly string[])[]
  readonly run: (args: readonly string[]) => Ran
} {
  const calls: (readonly string[])[] = []
  return {
    calls,
    run: (args) => {
      calls.push([...args])
      if ((given.refuse ?? []).includes(args.join(" "))) {
        return { code: 1, out: "systemctl would not" }
      }
      if (args[0] !== ASKED[0]) return { code: 0, out: "" }
      const said = Object.entries(given.up ?? {})
        .map(([unit, at]) => `Id=${unit}\nActiveEnterTimestamp=@${at / 1000}\n`)
        .join("\n")
      return { code: 0, out: said }
    },
  }
}

function keeping(owed: Owed = {}): Keeping {
  return { owed, commit: COMMIT, now: NOW }
}

function owing(): Owed {
  return { [UNIT]: { commit: COMMIT, why: WHY, since: THEN } }
}

function one(unit: string = UNIT): readonly Starting[] {
  return [{ unit, why: WHY }]
}

test("a service up longer than what it keeps between starts is started again at once", () => {
  const home = homeFor()
  const { calls, run } = taking({ up: { [UNIT]: NOW - A_DAY } })

  const said = startedOver(run, one(), home, keeping())

  expect(said.wrong).toEqual([])
  expect(said.said).toEqual([`started ${UNIT} again — ${WHY}`])
  expect(calls).toEqual([
    [...ASKED, UNIT],
    [RESTARTED, UNIT],
  ])
  expect(existsSync(owedAt(home))).toBe(false)
})

test("a service that came up inside what it keeps runs on and is owed the start", () => {
  const home = homeFor()
  const { calls, run } = taking({ up: { [UNIT]: NOW - 4 * A_MINUTE } })

  const said = startedOver(run, one(), home, keeping())

  expect(said.wrong).toEqual([])
  expect(said.said.join("")).toContain(`${UNIT} runs on, though ${WHY}`)
  expect(said.said.join("")).toContain("came up 4 minutes ago")
  expect(said.said.join("")).toContain(`keeps ${KEPT_MINUTES} minutes between starts`)
  expect(calls).toEqual([[...ASKED, UNIT]])
  expect(owedRead(home)).toEqual({
    [UNIT]: { commit: COMMIT, why: WHY, since: new Date(NOW).toISOString() },
  })
})

test("a start a service is owed is taken at the first landing past what it keeps", () => {
  const home = homeFor()
  const { calls, run } = taking({ up: { [UNIT]: NOW - 31 * A_MINUTE } })

  const said = startedOver(run, one(), home, keeping(owing()))

  expect(said.wrong).toEqual([])
  expect(said.said).toEqual([`started ${UNIT} again — ${WHY}, a start owed since ${THEN}`])
  expect(calls).toEqual([
    [...ASKED, UNIT],
    [RESTARTED, UNIT],
  ])
  expect(owedRead(home)).toEqual({})
})

test("of two services that changed the one lately up is held and the other started", () => {
  const home = homeFor()
  const both: readonly Starting[] = [
    { unit: UNIT, why: WHY },
    { unit: OTHER, why: WHY },
  ]
  const { calls, run } = taking({ up: { [UNIT]: NOW - A_MINUTE, [OTHER]: NOW - A_DAY } })

  const said = startedOver(run, both, home, keeping())

  expect(said.said.join("")).toContain(`${UNIT} runs on`)
  expect(said.said.join("")).toContain(`started ${OTHER} again`)
  expect(calls).toEqual([
    [...ASKED, UNIT, OTHER],
    [RESTARTED, OTHER],
  ])
  expect(Object.keys(owedRead(home))).toEqual([UNIT])
})

test("a start systemctl refused is owed rather than forgotten", () => {
  const home = homeFor()
  const { run } = taking({
    up: { [UNIT]: NOW - A_DAY },
    refuse: [`${RESTARTED} ${UNIT}`],
  })

  const said = startedOver(run, one(), home, keeping())

  expect(said.wrong.join("")).toContain(`${UNIT} runs as it did`)
  expect(said.wrong.join("")).toContain(PUT_RIGHT)
  expect(owedRead(home)).toEqual({
    [UNIT]: { commit: COMMIT, why: WHY, since: new Date(NOW).toISOString() },
  })
})

test("systemd that will not say how long a service has been up starts every one again", () => {
  const home = homeFor()
  const { calls, run } = taking({ refuse: [[...ASKED, UNIT].join(" ")] })

  const said = startedOver(run, one(), home, keeping())

  expect(said.wrong.join("")).toContain("could not be asked of systemd")
  expect(said.said).toEqual([`started ${UNIT} again — ${WHY}`])
  expect(calls).toEqual([
    [...ASKED, UNIT],
    [RESTARTED, UNIT],
  ])
})

test("a timer is armed again whatever moment that timer was armed", () => {
  const home = homeFor()
  const { calls, run } = taking({ up: { [TIMER]: NOW } })

  const said = startedOver(run, one(TIMER), home, keeping())

  expect(said.said).toEqual([`armed ${TIMER} again — ${WHY}`])
  expect(keptOver(one(TIMER))).toEqual([])
  expect(keptBack(TIMER, NOW, NOW)).toBe(false)
  expect(calls).toEqual([[RESTARTED, TIMER]])
})

test("a systemctl that throws is said as wrong rather than thrown", () => {
  const home = homeFor()
  const thrown = (): Ran => {
    throw new Error("dbus went away mid-start")
  }

  const said = startedOver(thrown, one(), home, keeping())

  expect(said.said).toEqual([])
  expect(said.wrong.join("")).toContain("dbus went away")
  expect(asked(thrown, []).code).not.toBe(0)
})

test("what each service is owed is carried beside the units and read back", () => {
  const home = homeFor()

  expect(owedRead(home)).toEqual({})
  owedWrite(home, owing())
  expect(owedRead(home)).toEqual(owing())
  writeFileSync(owedAt(home), "{")
  expect(owedRead(home)).toEqual({})
  expect(owedIn([1])).toEqual({})
  expect(owedIn(null)).toEqual({})
  expect(owedIn({ [UNIT]: { why: 1 } })).toEqual({})
  expect(owedIn({ [UNIT]: { why: WHY } })).toEqual({
    [UNIT]: { commit: "", why: WHY, since: "" },
  })
})

test("a start owed keeps the moment it was first owed and goes once taken", () => {
  const none: Owed = {}
  const first = owedOn(none, UNIT, WHY, keeping())
  const again = owedOn(first, UNIT, TIMER, { owed: none, commit: "", now: NOW + A_MINUTE })

  expect(first[UNIT]?.since).toBe(new Date(NOW).toISOString())
  expect(again[UNIT]).toEqual({ commit: "", why: TIMER, since: new Date(NOW).toISOString() })
  expect(owedOff(again, UNIT)).toEqual({})
  expect(owedOff(none, UNIT)).toBe(none)
  expect(owedSaid(undefined)).toBe("")
  expect(owedSaid(owing()[UNIT])).toContain(THEN)
})

test("how long a service has been up is read off what systemd says", () => {
  const { run } = taking({ up: { [UNIT]: NOW } })

  expect(cameUpFor(run, one()).up.get(UNIT)).toBe(NOW)
  expect(cameUpFor(run, []).up.size).toBe(0)
  expect(cameUpIn(`Id=${TIMER}\nActiveEnterTimestamp=\n`).size).toBe(0)
  expect(cameUpIn("").size).toBe(0)
})

test("a service is kept back only inside the minutes a service keeps between starts", () => {
  expect(KEPT_MINUTES).toBe(30)
  expect(keptBack(UNIT, undefined, NOW)).toBe(false)
  expect(keptBack(UNIT, NOW - 20 * A_MINUTE, NOW)).toBe(true)
  expect(keptBack(UNIT, NOW - 29 * A_MINUTE, NOW)).toBe(true)
  expect(keptBack(UNIT, NOW - KEPT_MINUTES * A_MINUTE, NOW)).toBe(false)
  expect(keptBack(UNIT, NOW - 31 * A_MINUTE, NOW)).toBe(false)
})

test("what is said of a start held back names how long that service has been up", () => {
  expect(keptSaid({ unit: UNIT, why: WHY }, NOW - 2 * A_MINUTE, NOW)).toContain(
    "came up 2 minutes ago"
  )
  expect(keptSaid({ unit: UNIT, why: WHY }, undefined, NOW)).toContain("came up 0 minutes ago")
})
