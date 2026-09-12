import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryItemRuleList as page } from "akasha/commands/pages/temper/inventory/item-rule/list/temper-inventory-item-rule-list.command.ts"
import { emitJson } from "akasha/temper/commands/format-output/format-output.module.code.ts"
import {
  ITEM_RULE_COLUMNS,
  itemRuleRow,
} from "akasha/temper/commands/inventory-rule-rows/inventory-rule-rows.module.code.ts"
import {
  settingsOf,
  toldRows,
} from "akasha/temper/commands/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import type { InventoryRuleSettings } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

export type Reading = () => Promise<InventoryRuleSettings>

export async function listing(asJson: boolean, reading: Reading): Promise<Answer> {
  const settings = await reading()
  const rules = settings.itemRules ?? []
  if (asJson) return told(emitJson(rules).split("\n"))
  return toldRows(rules.map(itemRuleRow), ITEM_RULE_COLUMNS)
}

async function listed(asJson: boolean): Promise<Answer> {
  return await listing(asJson, (await settingsOf()).read)
}

export async function temperInventoryItemRuleList(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [json], (taken) => listed(taken.json))
}
