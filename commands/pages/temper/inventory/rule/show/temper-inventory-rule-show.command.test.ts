import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { tsv } from "akasha/commands/arguments/pages/tsv.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { temperInventoryRuleShow } from "akasha/commands/pages/temper/inventory/rule/show/temper-inventory-rule-show.command.code.ts"
import { temperInventoryRuleShow as page } from "akasha/commands/pages/temper/inventory/rule/show/temper-inventory-rule-show.command.ts"

const CALLED_AS = "akasha temper inventory rule show"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [tsv, categoryRuleId, json]

const AS_TSV = saidForPart(PAGES, page.arguments[0]?.argument ?? "")

const AS_JSON = saidForPart(PAGES, page.arguments[2]?.argument ?? "")

const PLACED = `<${categoryRuleId.placeholder}>`

const showRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await temperInventoryRuleShow(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page declares three arguments, the id among them said as a word", () => {
  expect(page.arguments.length).toBe(3)
  expect(AS_TSV).toBe(tsv.said)
  expect(AS_JSON).toBe(json.said)
  expect(page.arguments[1]?.required).toBe(true)
  expect(page.arguments[1]?.saidAs).toBe("word")
})

test("a call naming no id asks for it by the placeholder its page carries", async () => {
  const said = await showRefusing([AS_TSV])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${PLACED}\``)
})

test("a flag this takes none of is refused, naming the three ways this is said", async () => {
  const said = await showRefusing(["--nope", "a-rule-the-settings-hold"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(AS_TSV)
  expect(said[0]).toContain(AS_JSON)
  expect(said[0]).toContain(`\`${PLACED}\``)
})

test("the shape flags carry no value, so joining one to either is refused", async () => {
  const asTsv = await showRefusing([`${AS_TSV}=yes`])
  expect(asTsv[0]).toContain("carries no value")
  expect(asTsv[0]).toContain(`${AS_TSV}=yes`)
  const asJson = await showRefusing([`${AS_JSON}=yes`])
  expect(asJson[0]).toContain("carries no value")
  expect(asJson[0]).toContain(`${AS_JSON}=yes`)
})

test("the answer's shape said twice is refused rather than the second passed over", async () => {
  const said = await showRefusing([AS_TSV, AS_TSV])
  expect(said[0]).toContain(AS_TSV)
  expect(said[0]).toContain("said twice")
})

test("the page declares --json, so it is taken rather than refused as unknown", async () => {
  const said = await showRefusing([AS_JSON])
  expect(said.length).toBe(1)
  expect(said[0]).not.toContain("is no argument")
  expect(said[0]).toContain(`\`${PLACED}\``)
})
