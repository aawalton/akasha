import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { filePath } from "akasha/commands/arguments/pages/file-path.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { top } from "akasha/commands/arguments/pages/top.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { measureComplexityReport } from "akasha/commands/pages/measure/complexity/report/measure-complexity-report.command.code.ts"
import { measureComplexityReport as page } from "akasha/commands/pages/measure/complexity/report/measure-complexity-report.command.ts"

const CALLED_AS = "akasha measure complexity report"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const OVER: readonly Argument[] = [json, top]

const TAKES: readonly string[] = page.arguments.map((one) => saidForPart(OVER, one.argument))

const reportRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureComplexityReport(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(TAKES.length).toBe(page.arguments.length)
  expect(TAKES).toEqual([json.said, top.said])
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("the report is over the whole workspace, so it takes no path to narrow it to", () => {
  expect(TAKES).not.toContain(filePath.said)
  const said = reportRefusing([filePath.said, "one.ts"])
  expect(said.length).toBe(2)
  expect(said[0]).toContain(filePath.said)
  expect(said[0]).toContain("is no argument")
  expect(said[1]).toContain("`one.ts`")
})

test("a flag this takes nothing of is refused, naming both arguments it does take", () => {
  const said = reportRefusing(["--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(TAKES.join("`, `"))
})

test("the count of outliers takes a whole number, and a word that is none is refused", () => {
  const said = reportRefusing([top.said, "many"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`${top.said} many`)
  expect(said[0]).toContain("whole number")
})

test("the count with no value after it is refused", () => {
  expect(reportRefusing([top.said])[0]).toBe(`\`${top.said}\` takes a value, and none follows it`)
})

test("the count said twice is refused, and one call says it once", () => {
  const said = reportRefusing([top.said, "5", top.said, "10"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("twice")
})

test("the JSON flag carries no value, so one joined to it is refused", () => {
  const said = reportRefusing([`${json.said}=1`])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${json.said}\``)
  expect(said[0]).toContain("carries no value")
})
