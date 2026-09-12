import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { itemRuleId } from "akasha/commands/arguments/pages/item-rule-id.argument.ts"
import {
  answering,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryItemRuleDuplicate as page } from "akasha/commands/pages/temper/inventory/item-rule/duplicate/temper-inventory-item-rule-duplicate.command.ts"
import { copyingRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryItemRuleDuplicate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [itemRuleId])
  if ("refused" in read) return refusedBy(read.refused)
  return await answering((done) => copyingRule("item", read.taken.itemRuleId, done))
}
