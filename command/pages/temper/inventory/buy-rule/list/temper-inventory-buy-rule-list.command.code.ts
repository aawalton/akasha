import { USER_ID } from "akasha/alan/harness/supabase-auth/modules/user-id/user-id.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { answeredByPage } from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperInventoryBuyRuleList as page } from "akasha/command/pages/temper/inventory/buy-rule/list/temper-inventory-buy-rule-list.command.ts"
import { emitJson } from "akasha/temper/command/modules/format-output/format-output.module.code.ts"
import {
  accountInventory,
  inventoryDatabase,
} from "akasha/temper/command/modules/inventory-reading/inventory-reading.module.code.ts"
import {
  settingsOf,
  toldRows,
} from "akasha/temper/command/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import { computeItemStock } from "akasha/temper/items-core/modules/compute-item-stock/compute-item-stock.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import { computeBuyShortfall } from "akasha/temper/items-rules-core/modules/buy-rule-eval/buy-rule-eval.module.code.ts"

const NO_INVENTORY = "no-inventory"

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

async function heldInventory(): Promise<InventoryDatabase | null> {
  const header = await accountInventory(USER_ID)
  if (header === null) return null
  return inventoryDatabase(header.slug)
}

async function shortfalls(asJson: boolean): Promise<Answer> {
  const settings = await (await settingsOf()).read()
  const rules = settings.buyRules ?? []
  const inventory = await heldInventory()
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
    const said = rules.map((rule) => {
      const read = reading.get(rule.id) ?? UNREAD
      return { ...rule, currentTotal: read.currentTotal, shortfall: read.shortfall }
    })
    return told(emitJson(said).split("\n"))
  }
  return toldRows(
    rules.map((rule) => {
      const read = reading.get(rule.id) ?? UNREAD
      return {
        itemName: rule.itemName,
        itemId: rule.itemId,
        target: rule.targetQuantity,
        current: read.currentTotal ?? NO_INVENTORY,
        shortfall: read.shortfall ?? NO_INVENTORY,
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
  return await answeredByPage(argv, given.calledAs, page, [json], (taken) => shortfalls(taken.json))
}
