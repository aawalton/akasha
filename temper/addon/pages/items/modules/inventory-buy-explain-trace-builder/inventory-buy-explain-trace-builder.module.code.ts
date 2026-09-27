import { buildEsoEvalEnv } from "akasha/temper/addon/pages/items/modules/inventory-eso-eval-env/inventory-eso-eval-env.module.code.ts"
import { resolvePriceSource } from "akasha/temper/addon/pages/items/modules/inventory-item-data/inventory-item-data.module.code.ts"
import {
  countHeld,
  ruleStockTarget,
  takerFor,
} from "akasha/temper/addon/pages/items/modules/inventory-rule-held/inventory-rule-held.module.code.ts"
import {
  bestOffer,
  computeBuyQuantity,
  itemTypesOf,
  offersWithin,
  type StoreOffer,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-buy-core/inventory-rules-buy-core.module.code.ts"
import { getCompiledConfig } from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { storeOffers } from "akasha/temper/addon/pages/items/modules/inventory-rules-dispatch-buy/inventory-rules-dispatch-buy.module.code.ts"
import type {
  BuyExplainRule,
  BuyExplainStoreScan,
  BuyExplainTrace,
} from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
import { computeBuyShortfall } from "akasha/temper/items/rules/core/modules/buy-shortfall/buy-shortfall.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { EvalContext } from "akasha/temper/items/rules/eval/modules/eval-env/eval-env.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

const SCHEMA_VERSION = 2

interface Reading {
  readonly offers: readonly StoreOffer[]
  readonly numEntries: number
  readonly ctx: EvalContext
  readonly currentCharId: string
  readonly playerMoney: number
}

function itemTypesFor(
  taken: readonly StoreOffer[],
  itemLink: string | undefined
): readonly number[] | undefined {
  if (taken.length > 0) return itemTypesOf(taken)
  if (itemLink === undefined) return undefined
  const [itemType] = GetItemLinkItemType(itemLink)
  return [itemType]
}

function ruleEntry(
  rule: CompiledOrderedRule,
  reading: Reading,
  itemLink: string | undefined
): BuyExplainRule | undefined {
  const takes = takerFor(rule, undefined, reading.ctx)
  if (itemLink !== undefined && !takes(itemLink, false)) return undefined
  const taken = reading.offers.filter((one) => takes(one.link, false))
  const offer = bestOffer(offersWithin(taken, rule.buyMaxPrice), rule.itemIds)
  const target = ruleStockTarget(rule)
  const held = countHeld(itemTypesFor(taken, itemLink), takes, reading.currentCharId)
  const shortfall = target === undefined ? 0 : computeBuyShortfall(target, held)
  const storeScan: BuyExplainStoreScan = {
    storeOpen: reading.numEntries > 0,
    numEntries: reading.numEntries,
    entriesTaken: taken.length,
  }
  if (offer !== undefined) {
    storeScan.matchedEntryIndex = offer.entryIndex
    storeScan.matchItemId = offer.itemId
    storeScan.matchPrice = offer.price
    storeScan.matchMaxBuyable = offer.maxBuyable
    storeScan.computedQuantity = computeBuyQuantity(
      shortfall,
      offer.maxBuyable,
      reading.playerMoney,
      offer.price
    )
  }
  const entry: BuyExplainRule = {
    ruleId: rule.id ?? rule.categoryId,
    categoryId: rule.categoryId,
    held,
    shortfall,
    storeScan,
  }
  if (target !== undefined) entry.targetQuantity = target
  if (rule.buyMaxPrice !== undefined) entry.buyMaxPrice = rule.buyMaxPrice
  return entry
}

export function buildBuyExplainTrace(itemLink: string | undefined): BuyExplainTrace | undefined {
  const compiled = getCompiledConfig()
  if (!compiled) return undefined

  const reading: Reading = {
    offers: storeOffers(),
    numEntries: GetNumStoreItems(),
    ctx: { env: buildEsoEvalEnv(), priceTableMissing: resolvePriceSource() === "ttc-no-table" },
    currentCharId: tostring(GetCurrentCharacterId()),
    playerMoney: GetCurrencyAmount(CURT_MONEY, CURRENCY_LOCATION_CHARACTER),
  }

  const rules: BuyExplainRule[] = []
  for (const rule of compiled.orderedRules) {
    if (rule.buyShortfall !== true || rule.active === false || rule.action !== "stock") continue
    const entry = ruleEntry(rule, reading, itemLink)
    if (entry !== undefined) rules.push(entry)
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    timestamp: GetGameTimeMilliseconds(),
    currentCharId: reading.currentCharId,
    playerMoney: reading.playerMoney,
    rules,
  }
}
