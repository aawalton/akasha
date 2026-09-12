import type { TakenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { action } from "akasha/commands/arguments/pages/action.argument.ts"
import { active } from "akasha/commands/arguments/pages/active.argument.ts"
import { destination } from "akasha/commands/arguments/pages/destination.argument.ts"
import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import { goal } from "akasha/commands/arguments/pages/goal.argument.ts"
import { itemRuleId } from "akasha/commands/arguments/pages/item-rule-id.argument.ts"
import { notes } from "akasha/commands/arguments/pages/notes.argument.ts"
import { stockQuantity } from "akasha/commands/arguments/pages/stock-quantity.argument.ts"
import { title } from "akasha/commands/arguments/pages/title.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryItemRuleUpdate as page } from "akasha/commands/pages/temper/inventory/item-rule/update/temper-inventory-item-rule-update.command.ts"
import {
  answeredByPage,
  lockedOff,
  named,
  refusing,
  settingsOf,
  toldOf,
  unfound,
  webOf,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import { narrowItemAction } from "akasha/temper/commands/inventory-rule-flags/inventory-rule-flags.module.code.ts"
import { narrowDestination } from "akasha/temper/items-rules-core/inventory-destination-parse/inventory-destination-parse.module.code.ts"
import { bulkUpdateItemRules } from "akasha/temper/items-rules-core/inventory-rule-settings/inventory-rule-settings.module.code.ts"
import type { ItemRule } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

const CHANGED = [action, destination, title, notes, goal, active, stockQuantity]

const PAGES = [...CHANGED, force, itemRuleId]

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

async function changed(taken: Taken, calledAs: string): Promise<Answer> {
  const said = taken.destination
  let moveTo: ReturnType<typeof narrowDestination>
  if (said !== undefined) {
    moveTo = narrowDestination(said)
    if (moveTo === undefined) {
      return refusing(`\`${destination.said}\` names \`${said}\`, which is no destination`, INPUT)
    }
  }
  const patch: Partial<
    Pick<
      ItemRule,
      "action" | "destination" | "active" | "goal" | "title" | "notes" | "stockQuantity"
    >
  > = {
    ...(taken.action !== undefined ? { action: narrowItemAction(taken.action, action.said) } : {}),
    ...(moveTo !== undefined ? { destination: moveTo } : {}),
    ...(taken.stockQuantity !== undefined ? { stockQuantity: taken.stockQuantity } : {}),
    ...webOf(taken),
  }
  if (Object.keys(patch).length === 0) {
    const every = named(CHANGED.map((one) => one.said))
    return refusing(`\`${calledAs}\` names no field to change — it changes ${every}`, INPUT)
  }
  const id = taken.itemRuleId
  const settingsAccess = await settingsOf()
  const settings = await settingsAccess.read()
  const rule = (settings.itemRules ?? []).find((one) => one.id === id)
  if (rule === undefined) return unfound("item", id)
  if (rule.locked === true && !taken.force) return lockedOff("item", id)
  const next = bulkUpdateItemRules(settings, [id], patch, { force: taken.force })
  await settingsAccess.write(next)
  return toldOf((next.itemRules ?? []).find((one) => one.id === id) ?? rule)
}

export async function temperInventoryItemRuleUpdate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, PAGES, (taken) =>
    changed(taken, given.calledAs)
  )
}
