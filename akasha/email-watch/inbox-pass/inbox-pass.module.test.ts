import { expect, test } from "bun:test"
import type { RunReport } from "../inbox-run/inbox-run.module.code.ts"
import { dryRunIn, personIn, saidOf, tallyOf } from "./inbox-pass.module.code.ts"

function reportOf(over: Partial<RunReport> = {}): RunReport {
  return { examined: 0, decisions: [], acted: 0, waiting: 0, unclaimed: 0, ...over }
}

test("naming no person reads Alan's inbox", () => {
  expect(personIn([])).toBe("alan")
  expect(personIn(["--dry-run"])).toBe("alan")
})

test("a person named after the flag is the person read", () => {
  expect(personIn(["--person", "elaine"])).toBe("elaine")
  expect(personIn(["--dry-run", "--person", "elaine"])).toBe("elaine")
})

test("a flag standing where a person's name was asked for is no name", () => {
  expect(personIn(["--person", "--dry-run"])).toBe("alan")
  expect(personIn(["--person"])).toBe("alan")
  expect(personIn(["--person", ""])).toBe("alan")
})

test("a dry run is asked for by its flag alone", () => {
  expect(dryRunIn(["--dry-run"])).toBe(true)
  expect(dryRunIn(["--person", "alan"])).toBe(false)
})

test("a run says in its closing line whether it was a dry run", () => {
  expect(tallyOf(reportOf(), true).startsWith("dry-run:")).toBe(true)
  expect(tallyOf(reportOf(), false).startsWith("pass:")).toBe(true)
})

test("a tally counts every message the run divided up", () => {
  const said = tallyOf(reportOf({ examined: 9, acted: 4, waiting: 2, unclaimed: 3 }), false)
  expect(said).toBe(
    "pass: examined 9 message(s) — 4 acted on, 2 waiting on an agent, 3 that no rule claimed"
  )
})

test("every decision is said before the tally", () => {
  const said = saidOf(reportOf({ examined: 2, decisions: ["a → kept", "b → binned"] }), false)
  expect(said).toEqual([
    "  a → kept",
    "  b → binned",
    "pass: examined 2 message(s) — 0 acted on, 0 waiting on an agent, 0 that no rule claimed",
  ])
})

test("a run that examined nothing still says its tally", () => {
  expect(saidOf(reportOf(), true)).toEqual([
    "dry-run: examined 0 message(s) — 0 acted on, 0 waiting on an agent, 0 that no rule claimed",
  ])
})
