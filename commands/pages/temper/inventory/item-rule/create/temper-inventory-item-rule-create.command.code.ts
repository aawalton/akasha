import type { TakenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { action } from "akasha/commands/arguments/pages/action.argument.ts"
import { active } from "akasha/commands/arguments/pages/active.argument.ts"
import { destination } from "akasha/commands/arguments/pages/destination.argument.ts"
import { goal } from "akasha/commands/arguments/pages/goal.argument.ts"
import { itemId } from "akasha/commands/arguments/pages/item-id.argument.ts"
import { itemName } from "akasha/commands/arguments/pages/item-name.argument.ts"
import { notes } from "akasha/commands/arguments/pages/notes.argument.ts"
import { stockQuantity } from "akasha/commands/arguments/pages/stock-quantity.argument.ts"
import { stockScope } from "akasha/commands/arguments/pages/stock-scope.argument.ts"
import { title } from "akasha/commands/arguments/pages/title.argument.ts"
import {
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryItemRuleCreate as page } from "akasha/commands/pages/temper/inventory/item-rule/create/temper-inventory-item-rule-create.command.ts"
import { emitJson } from "akasha/temper/commands/format-output/format-output.module.code.ts"
import {
  answeredByPage,
  settingsOf,
  webOf,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import { narrowItemAction } from "akasha/temper/commands/inventory-rule-flags/inventory-rule-flags.module.code.ts"
import { narrowDestination } from "akasha/temper/items-rules-core/inventory-destination-parse/inventory-destination-parse.module.code.ts"
import {
  addItemRule,
  bulkUpdateItemRules,
} from "akasha/temper/items-rules-core/inventory-rule-settings/inventory-rule-settings.module.code.ts"
import type { ItemRule } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

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

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

async function made(taken: Taken): Promise<Answer> {
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
  const settingsAccess = await settingsOf()
  const settings = await settingsAccess.read()
  const added = addItemRule(settings, {
    itemId: taken.itemId,
    itemName: taken.itemName,
    action: narrowItemAction(taken.action ?? NOTHING, action.said),
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
  await settingsAccess.write(next)
  const after = (next.itemRules ?? []).find((one) => one.id === created.id) ?? created
  return told(emitJson(after).split("\n"))
}

export async function temperInventoryItemRuleCreate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, PAGES, made)
}
