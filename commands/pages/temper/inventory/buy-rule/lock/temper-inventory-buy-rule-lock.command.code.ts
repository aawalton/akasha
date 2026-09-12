import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { buyRuleId } from "akasha/commands/arguments/pages/buy-rule-id.argument.ts"
import {
  answering,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryBuyRuleLock as page } from "akasha/commands/pages/temper/inventory/buy-rule/lock/temper-inventory-buy-rule-lock.command.ts"
import { lockingRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryBuyRuleLock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [buyRuleId])
  if ("refused" in read) return refusedBy(read.refused)
  return await answering((done) => lockingRule("buy", read.taken.buyRuleId, true, done))
}
