import { expect, test } from "bun:test"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  listing,
  temperInventoryItemRuleList,
} from "akasha/commands/pages/temper/inventory/item-rule/list/temper-inventory-item-rule-list.command.code.ts"
import { temperInventoryItemRuleList as page } from "akasha/commands/pages/temper/inventory/item-rule/list/temper-inventory-item-rule-list.command.ts"
import {
  ITEM_HELD,
  ITEM_LOCKED,
  WROTE,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.test-fixtures.ts"
import type { InventoryRuleSettings } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

const CALLED_AS = "akasha temper inventory item-rule list"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const HELD_RULES = WROTE.read

const NO_RULES = (): Promise<InventoryRuleSettings> => Promise.resolve({ version: 2, rules: [] })

test("the page takes one flag, and asking for JSON is the whole of the call", () => {
  expect(page.arguments.length).toBe(1)
  expect(page.arguments[0]?.argument).toContain(json.slug)
})

test("a flag the page never names is refused rather than ignored", async () => {
  const said = await temperInventoryItemRuleList(["--nope"], GIVEN)
  expect(said.refusals.join("\n")).toContain("--nope")
})

test("the rules are given in the order the settings have", async () => {
  const said = await listing(false, HELD_RULES)
  expect(said.refusals).toEqual([])
  const rows = said.report.join("\n")
  expect(rows.indexOf(ITEM_HELD)).toBeLessThan(rows.indexOf(ITEM_LOCKED))
})

test("settings holding no item rule are answered with no rule rather than nothing", async () => {
  const said = await listing(false, NO_RULES)
  expect(said.refusals).toEqual([])
  expect(said.report.join("\n")).not.toContain(ITEM_HELD)
})

test("the JSON says the whole rule rather than the columns a row carries", async () => {
  const said = await listing(true, HELD_RULES)
  const read: unknown = JSON.parse(said.report.join("\n"))
  expect(Array.isArray(read)).toBe(true)
  expect((read as ReadonlyArray<{ readonly id: string }>)[0]?.id).toBe(ITEM_HELD)
})
