import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import { answering } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryRuleDuplicate as page } from "akasha/commands/pages/temper/inventory/rule/duplicate/temper-inventory-rule-duplicate.command.ts"
import {
  copiedRule,
  refusedAll,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryRuleDuplicate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [categoryRuleId])
  if ("refused" in read) return refusedAll(read.refused)
  return await answering(() => copiedRule("category", read.taken.categoryRuleId))
}
