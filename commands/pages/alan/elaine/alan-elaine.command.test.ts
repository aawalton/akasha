import { expect, test } from "bun:test"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  alanElaine,
  NAMED,
  sinceDay,
  windowIn,
} from "akasha/commands/pages/alan/elaine/alan-elaine.command.code.ts"
import { alanElaine as page } from "akasha/commands/pages/alan/elaine/alan-elaine.command.ts"

const CALLED_AS = "akasha alan elaine"

const NOWHERE = "/nowhere"

const GIVEN: Given = {
  root: NOWHERE,
  calledAs: CALLED_AS,
  from: NOWHERE,
  writer: null,
  agentId: null,
}

function taking(argv: readonly string[]) {
  return takenFor(argv, CALLED_AS, page, NAMED)
}

function refusalOf(argv: readonly string[]): string {
  const said = taking(argv)
  return "refused" in said ? (said.refused[0] ?? "") : ""
}

test("a flag it does not take is refused and nothing is read", async () => {
  const said = await alanElaine(["--weeks", "2"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals.at(-1)).toContain("did nothing")
})

test("a word said here is refused, since this names no act", () => {
  expect(refusalOf(["health-snapshot"])).toContain("health-snapshot")
})

test("a flag naming a value with nothing after it is refused", () => {
  expect(refusalOf(["--days"])).toContain("takes a value")
})

test("the window it takes by default is fourteen days", () => {
  const window = windowIn(undefined)
  expect("refused" in window).toBe(false)
  expect(!("refused" in window) && window.days).toBe(14)
})

test("a window of no days is refused rather than read as the default", () => {
  const window = windowIn(0)
  expect("refused" in window && window.refused[0]).toContain("positive integer")
})

test("a window that is no integer is refused", () => {
  expect(refusalOf(["--days", "two"])).toContain("--days")
  expect(refusalOf(["--days", "1.5"])).toContain("--days")
  expect(refusalOf(["--days", "-3"])).toContain("--days")
})

test("a path and the json flag are read off the words", () => {
  const said = taking(["--file-path", "~/Downloads/export.zip", "--json"])
  expect("refused" in said).toBe(false)
  if ("refused" in said) return
  expect(said.taken.macbookFile).toBe("~/Downloads/export.zip")
  expect(said.taken.json).toBe(true)
})

test("the window reaches a day further back than the days asked for", () => {
  const nowMs = Date.parse("2026-09-03T12:00:00.000Z")
  expect(sinceDay(1, nowMs)).toBe("2026-09-01")
  expect(sinceDay(14, nowMs)).toBe("2026-08-19")
})
