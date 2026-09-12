import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { filePath } from "akasha/commands/arguments/pages/file-path.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { threshold } from "akasha/commands/arguments/pages/threshold.argument.ts"
import { top } from "akasha/commands/arguments/pages/top.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { measureComplexityHalstead } from "akasha/commands/pages/measure/complexity/halstead/measure-complexity-halstead.command.code.ts"
import { measureComplexityHalstead as page } from "akasha/commands/pages/measure/complexity/halstead/measure-complexity-halstead.command.ts"

const CALLED_AS = "akasha measure complexity halstead"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const READ: readonly Argument[] = [json, filePath, top, threshold]

const OFFERS = page.arguments.map((one) => {
  const said = saidForPart(READ, one.argument)
  return { said, carries: READ.find((each) => each.said === said)?.value ?? "none" }
})

const halsteadRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureComplexityHalstead(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(OFFERS.length).toBe(page.arguments.length)
  expect(OFFERS.map((one) => one.said)).toEqual([
    json.said,
    filePath.said,
    top.said,
    threshold.said,
  ])
})

test("a flag this takes nothing of is refused, naming every argument in the order declared", () => {
  const said = halsteadRefusing(["--nope"])[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(OFFERS.map((one) => one.said).join("`, `"))
})

test("nothing is required here, so a spare flag earns one refusal and no more", () => {
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
  expect(halsteadRefusing(["--nope"]).length).toBe(1)
})

test("a cutoff and a count each take a whole number and refuse a word that is none", () => {
  for (const one of OFFERS.filter((each) => each.carries === "whole-number")) {
    const said = halsteadRefusing([one.said, "many"])
    expect(said.length).toBe(1)
    expect(said[0]).toContain(`${one.said} many`)
    expect(said[0]).toContain("whole number")
  }
})

test("every argument carrying a value refuses being said with no value after it", () => {
  for (const one of OFFERS.filter((each) => each.carries !== "none")) {
    expect(halsteadRefusing([one.said])).toContain(
      `\`${one.said}\` takes a value, and none follows it`
    )
  }
})

test("every argument carrying a value refuses being said twice", () => {
  for (const one of OFFERS.filter((each) => each.carries !== "none")) {
    const said = halsteadRefusing([one.said, "1", one.said, "2"])
    expect(said.length).toBe(1)
    expect(said[0]).toContain("twice")
  }
})

test("every argument carrying no value refuses a value joined to it", () => {
  for (const one of OFFERS.filter((each) => each.carries === "none")) {
    const said = halsteadRefusing([`${one.said}=1`])
    expect(said[0]).toContain(`\`${one.said}\``)
    expect(said[0]).toContain("carries no value")
  }
})
