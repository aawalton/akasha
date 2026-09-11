import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  answeredCall,
  JSON_FLAG,
  settingsOf,
  shapeOf,
  toldOf,
  toldRows,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  ITEM_RULE_COLUMNS,
  itemRuleRow,
} from "akasha/temper/commands/inventory-rule-rows/inventory-rule-rows.module.code.ts"

const SHAPE = shapeOf([JSON_FLAG], { alone: [JSON_FLAG] })

async function listed(held: ReadonlyMap<string, string>): Promise<Answer> {
  const settings = await (await settingsOf()).read()
  const rules = settings.itemRules ?? []
  if (held.has(JSON_FLAG)) return toldOf(rules)
  return toldRows(rules.map(itemRuleRow), ITEM_RULE_COLUMNS)
}

export async function temperInventoryItemRuleList(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredCall(argv, given.calledAs, SHAPE, listed)
}
