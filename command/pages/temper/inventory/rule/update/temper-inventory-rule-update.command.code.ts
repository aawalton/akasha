import type { TakenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { action } from "akasha/command/argument/pages/action.argument.ts"
import { active } from "akasha/command/argument/pages/active.argument.ts"
import { category } from "akasha/command/argument/pages/category.argument.ts"
import { categoryRuleId } from "akasha/command/argument/pages/category-rule-id.argument.ts"
import { conditions } from "akasha/command/argument/pages/conditions.argument.ts"
import { craftShortfall } from "akasha/command/argument/pages/craft-shortfall.argument.ts"
import { destination } from "akasha/command/argument/pages/destination.argument.ts"
import { destinationChain } from "akasha/command/argument/pages/destination-chain.argument.ts"
import { force } from "akasha/command/argument/pages/force.argument.ts"
import { goal } from "akasha/command/argument/pages/goal.argument.ts"
import { notes } from "akasha/command/argument/pages/notes.argument.ts"
import { stockScope } from "akasha/command/argument/pages/stock-scope.argument.ts"
import { title } from "akasha/command/argument/pages/title.argument.ts"
import {
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryRuleUpdate as page } from "akasha/command/pages/temper/inventory/rule/update/temper-inventory-rule-update.command.ts"
import { emitJson } from "akasha/temper/command/modules/format-output/format-output.module.code.ts"
import {
  lockedOff,
  named,
  settingsOf,
  unfound,
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
  parseDestinationChainJson,
} from "akasha/temper/command/modules/inventory-rule-flags/inventory-rule-flags.module.code.ts"
import { bulkUpdateCategoryRules } from "akasha/temper/items/rules/core/modules/inventory-rule-settings/inventory-rule-settings.module.code.ts"

const CHANGED = [
  category,
  action,
  destination,
  destinationChain,
  conditions,
  title,
  notes,
  goal,
  active,
  stockScope,
  craftShortfall,
]

const PAGES = [...CHANGED, force, categoryRuleId]

export type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

export async function changing(
  taken: Taken,
  calledAs: string,
  writing: Writing,
  done: string[]
): Promise<Answer> {
  const chain = parseDestinationChainJson(taken.destinationChain)
  const narrowed = parseConditionsJson(taken.conditions)
  const clears = chain !== undefined && taken.destination === undefined
  const patch = {
    ...(taken.category !== undefined
      ? { categoryId: narrowCategoryId(taken.category, category.said) }
      : {}),
    ...(taken.action !== undefined ? { action: narrowItemAction(taken.action, action.said) } : {}),
    ...(taken.destination !== undefined
      ? { destination: narrowMoveToDestination(taken.destination, destination.said) }
      : {}),
    ...(clears ? { destination: undefined } : {}),
    ...(chain !== undefined ? { destinationChain: chain } : {}),
    ...(narrowed !== undefined ? { conditions: narrowed } : {}),
    ...(taken.stockScope !== undefined
      ? { stockScope: narrowStockScope(taken.stockScope, stockScope.said) }
      : {}),
    ...(taken.craftShortfall !== undefined ? { craftShortfall: taken.craftShortfall } : {}),
    ...(taken.goal !== undefined ? { goal: taken.goal } : {}),
    ...webOf(taken),
  }
  if (Object.keys(patch).length === 0) {
    const every = named(CHANGED.map((one) => one.said))
    return refused(`\`${calledAs}\` names no field to change — it changes ${every}`, INPUT)
  }
  const id = taken.categoryRuleId
  const settings = await writing.read()
  const rule = settings.rules.find((one) => one.id === id)
  if (rule === undefined) return unfound("category", id)
  if (rule.locked === true && !taken.force) return lockedOff("category", id)
  const next = bulkUpdateCategoryRules(settings, [id], patch, { force: taken.force })
  await writing.write(next)
  done.push(wroteSaid("category", id, "changed"))
  return told(emitJson(next.rules.find((one) => one.id === id) ?? rule).split("\n"))
}

async function changed(taken: Taken, calledAs: string, done: string[]): Promise<Answer> {
  return await changing(taken, calledAs, await settingsOf(), done)
}

export async function temperInventoryRuleUpdate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, PAGES, (taken, done) =>
    changed(taken, given.calledAs, done)
  )
}
