import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { filePath } from "akasha/commands/arguments/pages/file-path.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { threshold } from "akasha/commands/arguments/pages/threshold.argument.ts"
import { top } from "akasha/commands/arguments/pages/top.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { measureComplexityMaintainability } from "akasha/commands/pages/measure/complexity/maintainability/measure-complexity-maintainability.command.code.ts"
import { measureComplexityMaintainability as page } from "akasha/commands/pages/measure/complexity/maintainability/measure-complexity-maintainability.command.ts"

const CALLED_AS = "akasha measure complexity maintainability"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const WEIGHED: readonly Argument[] = [json, filePath, top, threshold]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(WEIGHED, one.argument))

const COUNTS: readonly string[] = WEIGHED.filter((one) => one.value === "whole-number").map(
  (one) => one.said
)

const VALUED: readonly string[] = WEIGHED.filter((one) => one.value !== "none").map(
  (one) => one.said
)

const BARE: readonly string[] = WEIGHED.filter((one) => one.value === "none").map((one) => one.said)

const indexRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureComplexityMaintainability(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(SAYS.length).toBe(page.arguments.length)
  expect(SAYS).toEqual([json.said, filePath.said, top.said, threshold.said])
})

test("the cutoff here keeps the low rows, and the page still takes it as a whole number", () => {
  expect(COUNTS).toContain(threshold.said)
  expect(COUNTS).toContain(top.said)
})

test("a flag this takes nothing of is refused, naming every argument in the order declared", () => {
  const said = indexRefusing(["--nope"])[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(SAYS.join("`, `"))
})

test("a word that is no whole number is refused for each argument counting in them", () => {
  for (const one of COUNTS) {
    const said = indexRefusing([one, "many"])
    expect(said.length).toBe(1)
    expect(said[0]).toContain(`${one} many`)
    expect(said[0]).toContain("whole number")
  }
})

test("a whole number past the largest that can be read is refused rather than rounded", () => {
  for (const one of COUNTS) {
    expect(indexRefusing([one, "99999999999999999999"])[0]).toContain("largest whole number")
  }
})

test("an argument carrying a value is refused where the value joined to it is empty", () => {
  for (const one of VALUED) {
    expect(indexRefusing([`${one}=`])[0]).toContain(`${one}=`)
  }
})

test("an argument carrying a value is refused where it is said twice", () => {
  for (const one of VALUED) {
    const said = indexRefusing([one, "1", one, "2"])
    expect(said.length).toBe(1)
    expect(said[0]).toContain("twice")
  }
})

test("an argument carrying no value is refused where a value is joined to it", () => {
  expect(BARE.length).toBeGreaterThan(0)
  for (const one of BARE) {
    expect(indexRefusing([`${one}=1`])[0]).toContain("carries no value")
  }
})
