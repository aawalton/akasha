import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { temperInventoryRuleDelete } from "akasha/commands/pages/temper/inventory/rule/delete/temper-inventory-rule-delete.command.code.ts"
import { temperInventoryRuleDelete as page } from "akasha/commands/pages/temper/inventory/rule/delete/temper-inventory-rule-delete.command.ts"

const CALLED_AS = "akasha temper inventory rule delete"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [force, categoryRuleId]

const FORCE = saidForPart(PAGES, page.arguments[0]?.argument ?? "")

const PLACED = `<${categoryRuleId.placeholder}>`

const deleteRefusals = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await temperInventoryRuleDelete(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page declares going on past the lock at a flag and the id as a word", () => {
  expect(page.arguments.length).toBe(2)
  expect(FORCE).toBe(force.said)
  expect(saidForPart(PAGES, page.arguments[1]?.argument ?? "")).toBe(categoryRuleId.said)
  expect(page.arguments[1]?.required).toBe(true)
  expect(page.arguments[1]?.saidAs).toBe("word")
})

test("a call naming no id is refused though it says to go on past the lock", async () => {
  const said = await deleteRefusals([FORCE])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${PLACED}\``)
})

test("a flag this takes none of is refused, naming both the ways this is said", async () => {
  const said = await deleteRefusals(["--nope", "a-rule-the-settings-hold"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(FORCE)
  expect(said[0]).toContain(`\`${PLACED}\``)
})

test("going on past the lock carries no value, so joining one to it is refused", async () => {
  const said = await deleteRefusals([`${FORCE}=yes`])
  expect(said[0]).toContain("carries no value")
  expect(said[0]).toContain(`${FORCE}=yes`)
})

test("a `--` makes even a flag this does take the id rather than that flag", async () => {
  const said = await deleteRefusals(["--", FORCE, "a-spare-word"])
  expect(said.length).toBe(1)
  expect(said[0]).not.toContain("is no argument")
  expect(said[0]).toContain("`a-spare-word`")
})
