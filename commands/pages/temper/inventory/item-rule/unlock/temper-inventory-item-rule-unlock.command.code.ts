import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { itemRuleId } from "akasha/commands/arguments/pages/item-rule-id.argument.ts"
import {
  answering,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryItemRuleUnlock as page } from "akasha/commands/pages/temper/inventory/item-rule/unlock/temper-inventory-item-rule-unlock.command.ts"
import { lockedRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryItemRuleUnlock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [itemRuleId])
  if ("refused" in read) return refusedBy(read.refused)
  return await answering(() => lockedRule("item", read.taken.itemRuleId, false))
}
