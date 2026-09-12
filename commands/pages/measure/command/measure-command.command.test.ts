import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { runWindow } from "akasha/commands/arguments/pages/run-window.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { measureCommand } from "akasha/commands/pages/measure/command/measure-command.command.code.ts"
import { measureCommand as page } from "akasha/commands/pages/measure/command/measure-command.command.ts"

const CALLED_AS = "akasha measure command"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const READS = saidForPart([runWindow], page.arguments[0]?.argument ?? "")

const NOT_A_WINDOW = "5y"

const commandRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureCommand(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("the page declares one argument, the window, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(READS).toBe(runWindow.said)
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("a flag this takes nothing of is refused, naming the one argument it does take", () => {
  const said = commandRefusing(["--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(`\`${READS}\``)
})

test("a bare double dash turns no word into a value where this takes no word", () => {
  expect(page.arguments.filter((one) => "saidAs" in one).length).toBe(0)
  const said = commandRefusing(["--", "30m"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("30m")
  expect(said[0]).toContain("is no argument")
})

test("the window written with an equals carries its value on to be weighed", () => {
  const said = commandRefusing([`${READS}=${NOT_A_WINDOW}`])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NOT_A_WINDOW)
  expect(said[0]).toContain("neither a count of runs nor a period")
})

test("a flag after the window is no value for it, and each is refused on its own", () => {
  const said = commandRefusing([READS, "--nope"])
  expect(said.length).toBe(2)
  expect(said[0]).toBe(`\`${READS}\` takes a value, and none follows it`)
  expect(said[1]).toContain("--nope")
})

test("the window said twice is refused, and one call says it once", () => {
  const said = commandRefusing([READS, "5", READS, "10"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("twice")
})

test("the window joined to an empty value is refused rather than read as nothing", () => {
  expect(commandRefusing([`${READS}=`])[0]).toContain(`${READS}=`)
})
