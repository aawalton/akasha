import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryItemRuleList as page } from "akasha/commands/pages/temper/inventory/item-rule/list/temper-inventory-item-rule-list.command.ts"
import { emitJson } from "akasha/temper/commands/format-output/format-output.module.code.ts"
import {
  settingsOf,
  toldRows,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  ITEM_RULE_COLUMNS,
  itemRuleRow,
} from "akasha/temper/commands/inventory-rule-rows/inventory-rule-rows.module.code.ts"

async function listed(asJson: boolean): Promise<Answer> {
  const settings = await (await settingsOf()).read()
  const rules = settings.itemRules ?? []
  if (asJson) return told(emitJson(rules).split("\n"))
  return toldRows(rules.map(itemRuleRow), ITEM_RULE_COLUMNS)
}

export async function temperInventoryItemRuleList(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, [json], (taken) => listed(taken.json))
}
