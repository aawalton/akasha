import { expect, test } from "bun:test"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { temperErrorList } from "akasha/commands/pages/temper/error-list/temper-error-list.command.code.ts"

const SAYS = "--stale-after-hours takes a whole number of hours"

test("a stale window that is no number at all is refused before a capture is read", async () => {
  const said = await temperErrorList(["--stale-after-hours", "abc"])

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(SAYS)
  expect(said.refusals.join("\n")).toContain("abc")
})

test("a stale window carrying a fraction is refused rather than rounded", async () => {
  const said = await temperErrorList(["--stale-after-hours", "1.5"])

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(SAYS)
})

test("a stale window under nought is refused rather than read as a window", async () => {
  const said = await temperErrorList(["--stale-after-hours", "-3"])

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(SAYS)
})
