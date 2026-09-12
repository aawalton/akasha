import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { answering } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryItemRuleList as page } from "akasha/commands/pages/temper/inventory/item-rule/list/temper-inventory-item-rule-list.command.ts"
import {
  refusedAll,
  settingsOf,
  toldOf,
  toldRows,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  ITEM_RULE_COLUMNS,
  itemRuleRow,
} from "akasha/temper/commands/inventory-rule-rows/inventory-rule-rows.module.code.ts"

async function listed(asJson: boolean): Promise<Answer> {
  const settings = await (await settingsOf()).read()
  const rules = settings.itemRules ?? []
  if (asJson) return toldOf(rules)
  return toldRows(rules.map(itemRuleRow), ITEM_RULE_COLUMNS)
}

export async function temperInventoryItemRuleList(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return refusedAll(read.refused)
  return await answering(() => listed(read.taken.json))
}
