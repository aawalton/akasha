import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { runWindow } from "akasha/commands/arguments/pages/run-window.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { measureAudit } from "akasha/commands/pages/measure/audit/measure-audit.command.code.ts"
import { measureAudit as page } from "akasha/commands/pages/measure/audit/measure-audit.command.ts"

const CALLED_AS = "akasha measure audit"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const ONLY = saidForPart([runWindow], page.arguments[0]?.argument ?? "")

const NO_WINDOW = "5y"

const auditRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureAudit(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("the page declares one argument, the window, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(ONLY).toBe(runWindow.said)
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("the window is said at a flag shorter than the argument page is slugged", () => {
  expect(runWindow.slug).toBe("run-window")
  expect(runWindow.said).toBe("--last")
})

test("a flag this takes nothing of is refused, naming the one argument it does take", () => {
  const said = auditRefusing(["--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(`\`${ONLY}\``)
})

test("a word off any flag is refused rather than taken as the window", () => {
  const said = auditRefusing(["30m"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("30m")
  expect(said[0]).toContain(`\`${ONLY}\``)
})

test("the window with no value after it is refused", () => {
  expect(auditRefusing([ONLY])[0]).toBe(`\`${ONLY}\` takes a value, and none follows it`)
})

test("the window joined to an empty value is refused rather than read as nothing", () => {
  expect(auditRefusing([`${ONLY}=`])[0]).toContain(`${ONLY}=`)
})

test("the window said twice is refused, and one call says it once", () => {
  const said = auditRefusing([ONLY, "5", ONLY, "10"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("twice")
})

test("a window that is neither a count of runs nor a period is refused after it is taken", () => {
  const said = auditRefusing([ONLY, NO_WINDOW])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NO_WINDOW)
  expect(said[0]).toContain(ONLY)
})

test("the refusal over such a window says both shapes the window is written in", () => {
  const said = auditRefusing([ONLY, NO_WINDOW])[0] ?? ""
  expect(said).toContain(`${ONLY} <count>`)
  expect(said).toContain("m|h|d")
})
