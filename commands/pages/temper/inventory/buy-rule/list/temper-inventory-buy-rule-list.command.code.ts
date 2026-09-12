import { USER_ID } from "akasha/alan/harness/supabase-auth/user-id/user-id.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperInventoryBuyRuleList as page } from "akasha/commands/pages/temper/inventory/buy-rule/list/temper-inventory-buy-rule-list.command.ts"
import {
  answeredWith,
  settingsOf,
  toldOf,
  toldRows,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  latestSnapshot,
  snapshotDatabase,
} from "akasha/temper/commands/inventory-snapshot-reading/inventory-snapshot-reading.module.code.ts"
import { computeItemStock } from "akasha/temper/items-core/compute-item-stock/compute-item-stock.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items-core/inventory-types/inventory-types.module.code.ts"
import { computeBuyShortfall } from "akasha/temper/items-rules-core/buy-rule-eval/buy-rule-eval.module.code.ts"

const NO_SNAPSHOT = "no-snapshot"

const COLUMNS = [
  "itemName",
  "itemId",
  "target",
  "current",
  "shortfall",
  "source",
  "active",
  "locked",
  "id",
]

type Reading = { readonly currentTotal: number | null; readonly shortfall: number | null }

const UNREAD: Reading = { currentTotal: null, shortfall: null }

async function latestInventory(): Promise<InventoryDatabase | null> {
  const header = await latestSnapshot(USER_ID)
  if (header === null) return null
  return snapshotDatabase(header.slug)
}

async function shortfalls(asJson: boolean): Promise<Answer> {
  const settings = await (await settingsOf()).read()
  const rules = settings.buyRules ?? []
  const inventory = await latestInventory()
  const reading = new Map<string, Reading>()
  if (inventory === null) {
    for (const rule of rules) reading.set(rule.id, UNREAD)
  } else {
    const stock = computeItemStock(inventory, new Set(rules.map((rule) => rule.itemId)))
    for (const rule of rules) {
      const currentTotal = stock.get(rule.itemId)?.total ?? 0
      reading.set(rule.id, {
        currentTotal,
        shortfall: computeBuyShortfall(rule.targetQuantity, currentTotal),
      })
    }
  }
  if (asJson) {
    return toldOf(
      rules.map((rule) => {
        const read = reading.get(rule.id) ?? UNREAD
        return { ...rule, currentTotal: read.currentTotal, shortfall: read.shortfall }
      })
    )
  }
  return toldRows(
    rules.map((rule) => {
      const read = reading.get(rule.id) ?? UNREAD
      return {
        itemName: rule.itemName,
        itemId: rule.itemId,
        target: rule.targetQuantity,
        current: read.currentTotal ?? NO_SNAPSHOT,
        shortfall: read.shortfall ?? NO_SNAPSHOT,
        source: rule.source,
        active: rule.active,
        locked: rule.locked,
        id: rule.id,
      }
    }),
    COLUMNS
  )
}

export async function temperInventoryBuyRuleList(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return await answeredWith(argv, given.calledAs, page, [json], (taken) => shortfalls(taken.json))
}
