import type { TakenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { action } from "akasha/commands/arguments/pages/action.argument.ts"
import { active } from "akasha/commands/arguments/pages/active.argument.ts"
import { category } from "akasha/commands/arguments/pages/category.argument.ts"
import { conditions } from "akasha/commands/arguments/pages/conditions.argument.ts"
import { destination } from "akasha/commands/arguments/pages/destination.argument.ts"
import { goal } from "akasha/commands/arguments/pages/goal.argument.ts"
import { notes } from "akasha/commands/arguments/pages/notes.argument.ts"
import { stockScope } from "akasha/commands/arguments/pages/stock-scope.argument.ts"
import { title } from "akasha/commands/arguments/pages/title.argument.ts"
import { DATA, refused } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryRuleCreate as page } from "akasha/commands/pages/temper/inventory/rule/create/temper-inventory-rule-create.command.ts"
import {
  answeredByPage,
  settingsOf,
  toldOf,
  webOf,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  narrowItemAction,
  narrowMoveToDestination,
  narrowStockScope,
  parseConditionsJson,
} from "akasha/temper/commands/inventory-rule-flags/inventory-rule-flags.module.code.ts"
import { addCategoryRule } from "akasha/temper/items-rules-core/inventory-rule-settings/inventory-rule-settings.module.code.ts"
import type { CategoryRule } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

const PAGES = [title, notes, goal, active, action, destination, stockScope, category, conditions]

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

async function made(taken: Taken): Promise<Answer> {
  const narrowed = parseConditionsJson(taken.conditions)
  const settingsAccess = await settingsOf()
  const settings = await settingsAccess.read()
  const next = addCategoryRule(settings, {
    categoryId: taken.category,
    action: narrowItemAction(taken.action, action.said),
    ...(taken.destination !== undefined
      ? { destination: narrowMoveToDestination(taken.destination, destination.said) }
      : {}),
    ...(narrowed !== undefined ? { conditions: narrowed } : {}),
    ...(taken.stockScope !== undefined
      ? { stockScope: narrowStockScope(taken.stockScope, stockScope.said) }
      : {}),
    ...(taken.goal !== undefined ? { goal: taken.goal } : {}),
  })
  const created = next.rules[next.rules.length - 1]
  if (created === undefined) {
    return refused("a category rule was added and none is at the end of the list", DATA)
  }
  const merged: CategoryRule = { ...created, ...webOf(taken) }
  await settingsAccess.write({
    ...next,
    rules: next.rules.map((one) => (one.id === created.id ? merged : one)),
  })
  return toldOf(merged)
}

export async function temperInventoryRuleCreate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, PAGES, made)
}
