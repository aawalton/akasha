import type { Answer } from "@akasha/command-system/calling"
import { ITEM_RULE_COLUMNS, itemRuleRow } from "@tools/lib/temper-inventory"
import {
  answering,
  JSON_FLAG,
  readIn,
  refusedAll,
  settingsOf,
  shapeOf,
  toldOf,
  toldRows,
} from "../inventory-rule-calling/inventory-rule-calling.module.code.ts"

const CALLED_AS = "akasha temper-inventory-item-rule-list"

const SHAPE = shapeOf([JSON_FLAG], { alone: [JSON_FLAG] })

async function listed(held: ReadonlyMap<string, string>): Promise<Answer> {
  const settings = await (await settingsOf()).read()
  const rules = settings.itemRules ?? []
  if (held.has(JSON_FLAG)) return toldOf(rules)
  return toldRows(rules.map(itemRuleRow), ITEM_RULE_COLUMNS)
}

export async function temperInventoryItemRuleList(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  return await answering(() => listed(read.said))
}
