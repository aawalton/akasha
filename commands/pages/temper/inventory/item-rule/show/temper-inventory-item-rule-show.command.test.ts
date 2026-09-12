import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { itemRuleId } from "akasha/commands/arguments/pages/item-rule-id.argument.ts"
import { tsv } from "akasha/commands/arguments/pages/tsv.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { temperInventoryItemRuleShow } from "akasha/commands/pages/temper/inventory/item-rule/show/temper-inventory-item-rule-show.command.code.ts"
import { temperInventoryItemRuleShow as page } from "akasha/commands/pages/temper/inventory/item-rule/show/temper-inventory-item-rule-show.command.ts"

const CALLED_AS = "akasha temper inventory item-rule show"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [tsv, itemRuleId]

const AS_TSV = saidForPart(PAGES, page.arguments[0]?.argument ?? "")

const PLACED = `<${itemRuleId.placeholder}>`

const showRefusals = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await temperInventoryItemRuleShow(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page declares the answer's shape at a flag and the id as a word", () => {
  expect(page.arguments.length).toBe(2)
  expect(AS_TSV).toBe(tsv.said)
  expect(saidForPart(PAGES, page.arguments[1]?.argument ?? "")).toBe(itemRuleId.said)
  expect(page.arguments[1]?.required).toBe(true)
  expect(page.arguments[1]?.saidAs).toBe("word")
})

test("a call naming no id asks for it by the placeholder its page carries", async () => {
  const said = await showRefusals([AS_TSV])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${PLACED}\``)
})

test("a flag this takes none of is refused, naming both the ways this is said", async () => {
  const said = await showRefusals(["--nope", "a-rule-the-settings-hold"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(AS_TSV)
  expect(said[0]).toContain(`\`${PLACED}\``)
})

test("the answer's shape carries no value, so joining one to it is refused", async () => {
  const said = await showRefusals([`${AS_TSV}=yes`])
  expect(said[0]).toContain("carries no value")
  expect(said[0]).toContain(`${AS_TSV}=yes`)
})

test("the answer's shape said twice is refused rather than the second passed over", async () => {
  const said = await showRefusals([AS_TSV, AS_TSV])
  expect(said[0]).toContain(AS_TSV)
  expect(said[0]).toContain("said twice")
})
