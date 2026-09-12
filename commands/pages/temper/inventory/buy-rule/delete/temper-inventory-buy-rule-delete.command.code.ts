import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { buyRuleId } from "akasha/commands/arguments/pages/buy-rule-id.argument.ts"
import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import {
  answering,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryBuyRuleDelete as page } from "akasha/commands/pages/temper/inventory/buy-rule/delete/temper-inventory-buy-rule-delete.command.ts"
import { droppingRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryBuyRuleDelete(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [force, buyRuleId])
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  return await answering((done) => droppingRule("buy", taken.buyRuleId, taken.force, done))
}
