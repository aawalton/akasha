import { expect, test } from "bun:test"
import {
  personIn,
  saidOf,
  tallyOf,
} from "akasha/alan/harness/email-watch/modules/inbox-pass/inbox-pass.module.code.ts"
import type { RunReport } from "akasha/alan/harness/email-watch/modules/inbox-run/inbox-run.module.code.ts"

function reportOf(over: Partial<RunReport> = {}): RunReport {
  return { examined: 0, decisions: [], acted: 0, waiting: 0, unclaimed: 0, discarded: 0, ...over }
}

test("naming no person reads Alan's inbox", () => {
  expect(personIn([])).toBe("alan")
  expect(personIn(["--verbose"])).toBe("alan")
})

test("a person named after the flag is the person read", () => {
  expect(personIn(["--person", "elaine"])).toBe("elaine")
  expect(personIn(["--verbose", "--person", "elaine"])).toBe("elaine")
})

test("a flag where a person's name was asked for is no name", () => {
  expect(personIn(["--person", "--verbose"])).toBe("alan")
  expect(personIn(["--person"])).toBe("alan")
  expect(personIn(["--person", ""])).toBe("alan")
})

test("a tally counts every message the run divided up", () => {
  const said = tallyOf(reportOf({ examined: 9, acted: 4, waiting: 2, unclaimed: 3, discarded: 1 }))
  expect(said).toBe(
    "run: examined 9 message(s) — 4 acted on, 2 waiting on an agent, " +
      "3 that no rule claimed, 1 discarded off a persona's channel"
  )
})

test("every decision is said before the tally", () => {
  const said = saidOf(reportOf({ examined: 2, decisions: ["a → kept", "b → binned"] }))
  expect(said).toEqual([
    "  a → kept",
    "  b → binned",
    "run: examined 2 message(s) — 0 acted on, 0 waiting on an agent, " +
      "0 that no rule claimed, 0 discarded off a persona's channel",
  ])
})

test("a run that examined nothing still says its tally", () => {
  expect(saidOf(reportOf())).toEqual([
    "run: examined 0 message(s) — 0 acted on, 0 waiting on an agent, " +
      "0 that no rule claimed, 0 discarded off a persona's channel",
  ])
})
