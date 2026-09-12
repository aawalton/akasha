import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import { answering } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryRuleDelete as page } from "akasha/commands/pages/temper/inventory/rule/delete/temper-inventory-rule-delete.command.ts"
import {
  droppedRule,
  refusedAll,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"

export async function temperInventoryRuleDelete(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [force, categoryRuleId])
  if ("refused" in read) return refusedAll(read.refused)
  const taken = read.taken
  return await answering(() => droppedRule("category", taken.categoryRuleId, taken.force))
}
