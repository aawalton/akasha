import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import { itemRuleId } from "akasha/commands/arguments/pages/item-rule-id.argument.ts"
import {
  answering,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryItemRuleDelete as page } from "akasha/commands/pages/temper/inventory/item-rule/delete/temper-inventory-item-rule-delete.command.ts"
import { droppedRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryItemRuleDelete(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [force, itemRuleId])
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  return await answering(() => droppedRule("item", taken.itemRuleId, taken.force))
}
