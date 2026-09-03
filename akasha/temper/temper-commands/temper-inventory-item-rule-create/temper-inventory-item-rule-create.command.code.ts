import type { Answer } from "@akasha/command-system/calling"
import { narrowDestination } from "@akasha/temper-items-rules-core/inventory-destination-parse"
import {
  addItemRule,
  bulkUpdateItemRules,
} from "@akasha/temper-items-rules-core/inventory-rule-settings"
import type { ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { narrowItemAction } from "@tools/lib/temper-inventory/rule-flags-shared"
import {
  ACTIVE,
  answering,
  DATA,
  GOAL,
  INPUT,
  NOTES,
  readIn,
  refusedAll,
  refusing,
  settingsOf,
  shapeOf,
  TITLE,
  toldOf,
  webIn,
  wholeOf,
} from "../inventory-rule-calling/inventory-rule-calling.module.code.ts"

const CALLED_AS = "akasha temper-inventory-item-rule-create"

const ITEM_ID = "--item-id"

const ITEM_NAME = "--item-name"

const ACTION = "--action"

const DESTINATION = "--destination"

const STOCK_QUANTITY = "--stock-quantity"

const STOCK_SCOPE = "--stock-scope"

const NOTHING = "nothing"

const SHAPE = shapeOf(
  [
    ITEM_ID,
    ITEM_NAME,
    ACTION,
    DESTINATION,
    TITLE,
    NOTES,
    GOAL,
    ACTIVE,
    STOCK_QUANTITY,
    STOCK_SCOPE,
  ],
  {
    whole: [ITEM_ID, STOCK_QUANTITY],
    yesNo: [ACTIVE],
    required: [ITEM_ID, ITEM_NAME],
  }
)

async function made(held: ReadonlyMap<string, string>): Promise<Answer> {
  if (held.has(STOCK_SCOPE)) {
    return refusing(
      `\`${STOCK_SCOPE}\` reaches no item rule, since what writes one carries no scope of its own`,
      INPUT
    )
  }
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
  const settingsAccess = await settingsOf()
  const settings = await settingsAccess.read()
  const added = addItemRule(settings, {
    itemId: wholeOf(held, ITEM_ID) ?? 0,
    itemName: held.get(ITEM_NAME) ?? "",
    action: narrowItemAction(held.get(ACTION) ?? NOTHING, ACTION),
  })
  const created = (added.itemRules ?? [])[0]
  if (created === undefined) {
    return refusing("an item rule was added and none stands at the front of the list", DATA)
  }
  const patch: Partial<
    Pick<
      ItemRule,
      "action" | "destination" | "active" | "goal" | "title" | "notes" | "stockQuantity"
    >
  > = {
    ...webIn(held),
    ...(destination !== undefined ? { destination } : {}),
    ...(stockQuantity !== undefined ? { stockQuantity } : {}),
  }
  const next =
    Object.keys(patch).length > 0 ? bulkUpdateItemRules(added, [created.id], patch) : added
  await settingsAccess.write(next)
  return toldOf((next.itemRules ?? []).find((one) => one.id === created.id) ?? created)
}

export async function temperInventoryItemRuleCreate(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  return await answering(() => made(read.said))
}
