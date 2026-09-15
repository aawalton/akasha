import type { TakenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { action } from "akasha/command/argument/pages/action.argument.ts"
import { active } from "akasha/command/argument/pages/active.argument.ts"
import { category } from "akasha/command/argument/pages/category.argument.ts"
import { conditions } from "akasha/command/argument/pages/conditions.argument.ts"
import { destination } from "akasha/command/argument/pages/destination.argument.ts"
import { goal } from "akasha/command/argument/pages/goal.argument.ts"
import { notes } from "akasha/command/argument/pages/notes.argument.ts"
import { stockScope } from "akasha/command/argument/pages/stock-scope.argument.ts"
import { title } from "akasha/command/argument/pages/title.argument.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryRuleCreate as page } from "akasha/command/pages/temper/inventory/rule/create/temper-inventory-rule-create.command.ts"
import { emitJson } from "akasha/temper/command/modules/format-output/format-output.module.code.ts"
import {
  settingsOf,
  type Writing,
  webOf,
  wroteSaid,
} from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  narrowCategoryId,
  narrowItemAction,
  narrowMoveToDestination,
  narrowStockScope,
  parseConditionsJson,
} from "akasha/temper/command/modules/inventory-rule-flags/inventory-rule-flags.module.code.ts"
import { addCategoryRule } from "akasha/temper/items-rules-core/modules/inventory-rule-settings/inventory-rule-settings.module.code.ts"
import type { CategoryRule } from "akasha/temper/items-rules-core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

const PAGES = [title, notes, goal, active, action, destination, stockScope, category, conditions]

export type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

export async function making(taken: Taken, writing: Writing, done: string[]): Promise<Answer> {
  const categoryId = narrowCategoryId(taken.category, category.said)
  const doing = narrowItemAction(taken.action, action.said)
  const moveTo =
    taken.destination === undefined
      ? undefined
      : narrowMoveToDestination(taken.destination, destination.said)
  const scope =
    taken.stockScope === undefined ? undefined : narrowStockScope(taken.stockScope, stockScope.said)
  const narrowed = parseConditionsJson(taken.conditions)
  const settings = await writing.read()
  const next = addCategoryRule(settings, {
    categoryId,
    action: doing,
    ...(moveTo !== undefined ? { destination: moveTo } : {}),
    ...(narrowed !== undefined ? { conditions: narrowed } : {}),
    ...(scope !== undefined ? { stockScope: scope } : {}),
    ...(taken.goal !== undefined ? { goal: taken.goal } : {}),
  })
  const created = next.rules[next.rules.length - 1]
  if (created === undefined) {
    return refused("a category rule was added and none is at the end of the list", DATA)
  }
  const merged: CategoryRule = { ...created, ...webOf(taken) }
  await writing.write({
    ...next,
    rules: next.rules.map((one) => (one.id === created.id ? merged : one)),
  })
  done.push(wroteSaid("category", merged.id, "added"))
  return told(emitJson(merged).split("\n"))
}

async function made(taken: Taken, done: string[]): Promise<Answer> {
  return await making(taken, await settingsOf(), done)
}

export async function temperInventoryRuleCreate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, PAGES, made)
}
