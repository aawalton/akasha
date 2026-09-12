import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  alanElaine,
  readIn,
  sinceDay,
} from "akasha/commands/pages/alan/elaine/alan-elaine.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha alan elaine", from: root, writer: null, agentId: null }
}

test("a flag it does not take is refused and nothing is read", async () => {
  const said = await alanElaine(["--weeks", "2"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals.at(-1)).toContain("did nothing")
})

test("a word said here is refused, since this names no act", () => {
  const said = readIn(["health-snapshot"])
  expect("refused" in said && said.refused[0]).toContain("is no word this takes")
})

test("a flag naming a value with nothing after it is refused", () => {
  const said = readIn(["--days"])
  expect("refused" in said && said.refused[0]).toContain("names a value")
})

test("the window it takes by default is fourteen days", () => {
  const said = readIn([])
  expect("refused" in said).toBe(false)
  expect(!("refused" in said) && said.days).toBe(14)
})

test("a window of no days is refused rather than read as the default", () => {
  const said = readIn(["--days", "0"])
  expect("refused" in said && said.refused[0]).toContain("positive integer")
})

test("a window that is no integer is refused", () => {
  expect("refused" in readIn(["--days", "two"])).toBe(true)
  expect("refused" in readIn(["--days", "1.5"])).toBe(true)
  expect("refused" in readIn(["--days", "-3"])).toBe(true)
})

test("a path and the json flag are read off the words", () => {
  const said = readIn(["--file-path", "~/Downloads/export.zip", "--json"])
  expect("refused" in said).toBe(false)
  if ("refused" in said) return
  expect(said.path).toBe("~/Downloads/export.zip")
  expect(said.json).toBe(true)
})

test("the window reaches a day further back than the days asked for", () => {
  const nowMs = Date.parse("2026-09-03T12:00:00.000Z")
  expect(sinceDay(1, nowMs)).toBe("2026-09-01")
  expect(sinceDay(14, nowMs)).toBe("2026-08-19")
})
