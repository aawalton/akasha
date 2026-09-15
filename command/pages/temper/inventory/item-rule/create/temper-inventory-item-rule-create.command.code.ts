import type { TakenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { action } from "akasha/command/argument/pages/action.argument.ts"
import { active } from "akasha/command/argument/pages/active.argument.ts"
import { destination } from "akasha/command/argument/pages/destination.argument.ts"
import { goal } from "akasha/command/argument/pages/goal.argument.ts"
import { itemId } from "akasha/command/argument/pages/item-id.argument.ts"
import { itemName } from "akasha/command/argument/pages/item-name.argument.ts"
import { notes } from "akasha/command/argument/pages/notes.argument.ts"
import { stockQuantity } from "akasha/command/argument/pages/stock-quantity.argument.ts"
import { stockScope } from "akasha/command/argument/pages/stock-scope.argument.ts"
import { title } from "akasha/command/argument/pages/title.argument.ts"
import {
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryItemRuleCreate as page } from "akasha/command/pages/temper/inventory/item-rule/create/temper-inventory-item-rule-create.command.ts"
import { emitJson } from "akasha/temper/command/modules/format-output/format-output.module.code.ts"
import {
  settingsOf,
  type Writing,
  webOf,
  wroteSaid,
} from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import { narrowItemAction } from "akasha/temper/command/modules/inventory-rule-flags/inventory-rule-flags.module.code.ts"
import { narrowDestination } from "akasha/temper/items-rules-core/modules/inventory-destination-parse/inventory-destination-parse.module.code.ts"
import {
  addItemRule,
  bulkUpdateItemRules,
} from "akasha/temper/items-rules-core/modules/inventory-rule-settings/inventory-rule-settings.module.code.ts"
import type { ItemRule } from "akasha/temper/items-rules-core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

const NOTHING = "nothing"

const PAGES = [
  title,
  notes,
  goal,
  active,
  action,
  destination,
  stockScope,
  itemId,
  itemName,
  stockQuantity,
]

export type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

export async function making(taken: Taken, writing: Writing, done: string[]): Promise<Answer> {
  if (taken.stockScope !== undefined) {
    return refused(
      `\`${stockScope.said}\` reaches no item rule, since what writes one carries no scope of its own`,
      INPUT
    )
  }
  const said = taken.destination
  let moveTo: ReturnType<typeof narrowDestination>
  if (said !== undefined) {
    moveTo = narrowDestination(said)
    if (moveTo === undefined) {
      return refused(`\`${destination.said}\` names \`${said}\`, which is no destination`, INPUT)
    }
  }
  const doing = narrowItemAction(taken.action ?? NOTHING, action.said)
  const settings = await writing.read()
  const added = addItemRule(settings, {
    itemId: taken.itemId,
    itemName: taken.itemName,
    action: doing,
  })
  const created = (added.itemRules ?? [])[0]
  if (created === undefined) {
    return refused("an item rule was added and none is at the front of the list", DATA)
  }
  const patch: Partial<
    Pick<
      ItemRule,
      "action" | "destination" | "active" | "goal" | "title" | "notes" | "stockQuantity"
    >
  > = {
    ...webOf(taken),
    ...(moveTo !== undefined ? { destination: moveTo } : {}),
    ...(taken.stockQuantity !== undefined ? { stockQuantity: taken.stockQuantity } : {}),
  }
  const next =
    Object.keys(patch).length > 0 ? bulkUpdateItemRules(added, [created.id], patch) : added
  await writing.write(next)
  done.push(wroteSaid("item", created.id, "added"))
  const after = (next.itemRules ?? []).find((one) => one.id === created.id) ?? created
  return told(emitJson(after).split("\n"))
}

async function made(taken: Taken, done: string[]): Promise<Answer> {
  return await making(taken, await settingsOf(), done)
}

export async function temperInventoryItemRuleCreate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, PAGES, made)
}
