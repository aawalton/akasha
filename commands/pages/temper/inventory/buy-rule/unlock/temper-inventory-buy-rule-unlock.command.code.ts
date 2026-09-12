import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { buyRuleId } from "akasha/commands/arguments/pages/buy-rule-id.argument.ts"
import {
  answering,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryBuyRuleUnlock as page } from "akasha/commands/pages/temper/inventory/buy-rule/unlock/temper-inventory-buy-rule-unlock.command.ts"
import { lockingRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryBuyRuleUnlock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [buyRuleId])
  if ("refused" in read) return refusedBy(read.refused)
  return await answering((done) => lockingRule("buy", read.taken.buyRuleId, false, done))
}
