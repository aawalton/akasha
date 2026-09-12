import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import {
  answering,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryRuleLock as page } from "akasha/commands/pages/temper/inventory/rule/lock/temper-inventory-rule-lock.command.ts"
import { lockingRule } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryRuleLock(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [categoryRuleId])
  if ("refused" in read) return refusedBy(read.refused)
  return await answering((done) => lockingRule("category", read.taken.categoryRuleId, true, done))
}
