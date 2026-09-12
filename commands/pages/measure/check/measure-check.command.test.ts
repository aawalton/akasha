import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { runWindow } from "akasha/commands/arguments/pages/run-window.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { measureCheck } from "akasha/commands/pages/measure/check/measure-check.command.code.ts"
import { measureCheck as page } from "akasha/commands/pages/measure/check/measure-check.command.ts"

const CALLED_AS = "akasha measure check"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const OVER = saidForPart([runWindow], page.arguments[0]?.argument ?? "")

const NO_UNIT = "5x"

const BELOW_NOUGHT = "-3"

const checkRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureCheck(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("the page declares one argument, the window, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(OVER).toBe(runWindow.said)
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("a flag this takes nothing of is refused, naming the one argument it does take", () => {
  const said = checkRefusing(["--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(`\`${OVER}\``)
})

test("the window with no value after it is refused", () => {
  expect(checkRefusing([OVER])[0]).toBe(`\`${OVER}\` takes a value, and none follows it`)
})

test("the window joined to an empty value is refused rather than read as nothing", () => {
  expect(checkRefusing([`${OVER}=`])[0]).toContain(`${OVER}=`)
})

test("the window said twice is refused, and one call says it once", () => {
  const said = checkRefusing([OVER, "5", OVER, "10"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("twice")
})

test("a count with a unit nothing measures in is refused once the window is taken", () => {
  const said = checkRefusing([OVER, NO_UNIT])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NO_UNIT)
  expect(said[0]).toContain("m|h|d")
})

test("a word opening with one dash is a value here rather than a flag", () => {
  const said = checkRefusing([OVER, BELOW_NOUGHT])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(BELOW_NOUGHT)
  expect(said[0]).not.toContain("is no argument")
})

test("the refusal over a window says both shapes a window is written in", () => {
  const said = checkRefusing([OVER, NO_UNIT])[0] ?? ""
  expect(said).toContain(`${OVER} <count>`)
  expect(said).toContain("names runs")
  expect(said).toContain("names a period")
})
