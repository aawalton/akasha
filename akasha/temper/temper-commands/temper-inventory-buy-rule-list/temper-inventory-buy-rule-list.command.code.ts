import type { Answer } from "@akasha/command-system/calling"
import { computeItemStock } from "@akasha/temper-items-core/compute-item-stock"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import { computeBuyShortfall } from "@akasha/temper-items-rules-core/buy-rule-eval"
import {
  assembleSnapshot,
  latestSnapshot,
  snapshotChunks,
} from "@tools/lib/temper-inventory/snapshot-read"
import { USER_ID } from "@tools/lib/user-id"
import {
  answering,
  JSON_FLAG,
  readIn,
  refusedAll,
  settingsOf,
  shapeOf,
  toldOf,
  toldRows,
} from "../inventory-rule-calling/inventory-rule-calling.module.code.ts"

const CALLED_AS = "akasha temper-inventory-buy-rule-list"

const SHAPE = shapeOf([JSON_FLAG], { alone: [JSON_FLAG] })

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

type Standing = { readonly currentTotal: number | null; readonly shortfall: number | null }

const UNREAD: Standing = { currentTotal: null, shortfall: null }

async function latestInventory(): Promise<InventoryDatabase | null> {
  const header = await latestSnapshot(USER_ID)
  if (header === null) return null
  return assembleSnapshot(await snapshotChunks(header.slug))
}

async function listed(held: ReadonlyMap<string, string>): Promise<Answer> {
  const settings = await (await settingsOf()).read()
  const rules = settings.buyRules ?? []
  const inventory = await latestInventory()
  const standing = new Map<string, Standing>()
  if (inventory === null) {
    for (const rule of rules) standing.set(rule.id, UNREAD)
  } else {
    const stock = computeItemStock(inventory, new Set(rules.map((rule) => rule.itemId)))
    for (const rule of rules) {
      const currentTotal = stock.get(rule.itemId)?.total ?? 0
      standing.set(rule.id, {
        currentTotal,
        shortfall: computeBuyShortfall(rule.targetQuantity, currentTotal),
      })
    }
  }
  if (held.has(JSON_FLAG)) {
    return toldOf(
      rules.map((rule) => {
        const read = standing.get(rule.id) ?? UNREAD
        return { ...rule, currentTotal: read.currentTotal, shortfall: read.shortfall }
      })
    )
  }
  return toldRows(
    rules.map((rule) => {
      const read = standing.get(rule.id) ?? UNREAD
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

export async function temperInventoryBuyRuleList(argv: readonly string[] = []): Promise<Answer> {
  const read = readIn(argv, CALLED_AS, SHAPE)
  if ("refused" in read) return refusedAll(read.refused)
  return await answering(() => listed(read.said))
}
