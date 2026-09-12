import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { filePath } from "akasha/commands/arguments/pages/file-path.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { threshold } from "akasha/commands/arguments/pages/threshold.argument.ts"
import { top } from "akasha/commands/arguments/pages/top.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { measureComplexityCyclomatic } from "akasha/commands/pages/measure/complexity/cyclomatic/measure-complexity-cyclomatic.command.code.ts"
import { measureComplexityCyclomatic as page } from "akasha/commands/pages/measure/complexity/cyclomatic/measure-complexity-cyclomatic.command.ts"

const CALLED_AS = "akasha measure complexity cyclomatic"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES: readonly Argument[] = [json, filePath, top, threshold]

const SPELLED: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const COUNTING: readonly Argument[] = PAGES.filter((one) => one.value === "whole-number")

const refusalsOf = (argv: readonly string[]): readonly string[] => {
  const answer = measureComplexityCyclomatic(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(SPELLED.length).toBe(page.arguments.length)
  expect(SPELLED).toEqual([json.said, filePath.said, top.said, threshold.said])
})

test("this command needs no argument, so a bare call earns no refusal about one", () => {
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
  const said = refusalsOf(["--nope"])
  expect(said.length).toBe(1)
})

test("a flag this takes nothing of is refused, naming every argument in the order declared", () => {
  const said = refusalsOf(["--nope"])[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(SPELLED.join("`, `"))
})

test("each argument counting in whole numbers refuses a word that is no whole number", () => {
  expect(COUNTING.length).toBeGreaterThan(0)
  for (const one of COUNTING) {
    const said = refusalsOf([one.said, "many"])
    expect(said.length).toBe(1)
    expect(said[0]).toContain(`${one.said} many`)
    expect(said[0]).toContain("whole number")
  }
})

test("a whole number past the largest that can be read is refused rather than rounded", () => {
  const said = refusalsOf([top.said, "99999999999999999999"])
  expect(said[0]).toContain("largest whole number")
})

test("the path a call names is refused where it is said twice", () => {
  const said = refusalsOf([filePath.said, "one.ts", filePath.said, "two.ts"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${filePath.said}\``)
  expect(said[0]).toContain("twice")
})

test("the flag answering as JSON carries no value, so one joined to it is refused", () => {
  const said = refusalsOf([`${json.said}=1`])
  expect(said[0]).toContain(`\`${json.said}\``)
  expect(said[0]).toContain("carries no value")
})

test("an argument carrying a value is refused where no value follows it", () => {
  const said = refusalsOf([threshold.said])
  expect(said[0]).toBe(`\`${threshold.said}\` takes a value, and none follows it`)
})
