import type { Answer } from "@akasha/command-system/calling"
import { narrowDestination } from "@akasha/temper-items-rules-core/inventory-destination-parse"
import { bulkUpdateItemRules } from "@akasha/temper-items-rules-core/inventory-rule-settings"
import type { ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import {
  ACTIVE,
  answering,
  FORCE,
  GOAL,
  INPUT,
  lockedOff,
  NOTES,
  named,
  readIn,
  refusedAll,
  refusing,
  settingsOf,
  shapeOf,
  TITLE,
  toldOf,
  unfound,
  webIn,
  wholeOf,
} from "../inventory-rule-calling/inventory-rule-calling.module.code.ts"
import { narrowItemAction } from "../inventory-rule-flags/inventory-rule-flags.module.code.ts"

const CALLED_AS = "akasha temper-inventory-item-rule-update"

const ACTION = "--action"

const DESTINATION = "--destination"

const STOCK_QUANTITY = "--stock-quantity"

const CHANGES = [ACTION, DESTINATION, TITLE, NOTES, GOAL, ACTIVE, STOCK_QUANTITY]

const SHAPE = shapeOf([...CHANGES, FORCE], {
  alone: [FORCE],
  whole: [STOCK_QUANTITY],
  yesNo: [ACTIVE],
  namesARule: true,
})

async function changed(id: string, held: ReadonlyMap<string, string>): Promise<Answer> {
  const action = held.get(ACTION)
  const destinationSaid = held.get(DESTINATION)
  let destination: ReturnType<typeof narrowDestination>
  if (destinationSaid !== undefined) {
    destination = narrowDestination(destinationSaid)
    if (destination === undefined) {
      return refusing(
        `\`${DESTINATION}\` names \`${destinationSaid}\`, which is no destination`,
        INPUT
      )
    }
  }
  const stockQuantity = wholeOf(held, STOCK_QUANTITY)
  const patch: Partial<
    Pick<
      ItemRule,
      "action" | "destination" | "active" | "goal" | "title" | "notes" | "stockQuantity"
    >
  > = {
    ...(action !== undefined ? { action: narrowItemAction(action, ACTION) } : {}),
    ...(destination !== undefined ? { destination } : {}),
    ...(stockQuantity !== undefined ? { stockQuantity } : {}),
    ...webIn(held),
  }
  if (Object.keys(patch).length === 0) {
    return refusing(
      `\`${CALLED_AS}\` names no field to change — it changes ${named(CHANGES)}`,
      INPUT
    )
  }
  const force = held.has(FORCE)
  const settingsAccess = await settingsOf()
  const settings = await settingsAccess.read()
  const standing = (settings.itemRules ?? []).find((one) => one.id === id)
  if (standing === undefined) return unfound("item", id)
  if (standing.locked === true && !force) return lockedOff("item", id)
  const next = bulkUpdateItemRules(settings, [id], patch, { force })
  await settingsAccess.write(next)
  return toldOf((next.itemRules ?? []).find((one) => one.id === id) ?? standing)
}

export async function temperInventoryItemRuleUpdate(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  const id = read.id ?? ""
  return await answering(() => changed(id, read.said))
}
