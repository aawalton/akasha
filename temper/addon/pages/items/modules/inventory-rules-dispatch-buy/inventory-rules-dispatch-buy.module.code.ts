import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
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
  type StoreOffer,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-buy-core/inventory-rules-buy-core.module.code.ts"
import { getCompiledConfig } from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import {
  shouldConfirmAction,
  showConfirmDialog,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-core-confirm-dialog/inventory-rules-core-confirm-dialog.module.code.ts"
import {
  formatItemList,
  reportAction,
  reportPendingAction,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
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
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

interface BuyTarget {
  entryIndex: number
  itemId: number
  link: string
  quantity: number
  price: number
}

type CompiledConfig = NonNullable<ReturnType<typeof getCompiledConfig>>

function say(this: void, message: string): undefined {
  d(`[${ADDON_NAME}] ${message}`)
}

export function storeOffers(this: void): StoreOffer[] {
  const offers: StoreOffer[] = []
  const numEntries = GetNumStoreItems()
  for (let i = 1; i <= numEntries; i++) {
    const link = GetStoreItemLink(i, LINK_STYLE_BRACKETS)
    if (link === "") continue
    const [, , , price, , meetsRequirementsToBuy] = GetStoreEntryInfo(i)
    if (!meetsRequirementsToBuy) continue
    const maxBuyable = GetStoreEntryMaxBuyable(i)
    if (maxBuyable <= 0) continue
    const [itemType] = GetItemLinkItemType(link)
    offers.push({
      entryIndex: i,
      itemId: GetItemLinkItemId(link),
      itemType,
      link,
      price,
      maxBuyable,
    })
  }
  return offers
}

function shortfallBuyFor(
  rule: CompiledOrderedRule,
  offers: readonly StoreOffer[],
  ctx: EvalContext,
  currentCharId: string,
  money: number
): BuyTarget | undefined {
  const takes = takerFor(rule, undefined, ctx)
  const taken = offers.filter((one) => takes(one.link, false))
  const offer = bestOffer(taken, rule.itemIds)
  if (offer === undefined) return undefined
  const name = `rule ${rule.id ?? rule.categoryId}`
  const target = ruleStockTarget(rule)
  if (target === undefined) {
    say(`${name}: bought nothing, since its chain has no by-priority leg to count a target from`)
    return undefined
  }
  const held = countHeld(itemTypesOf(taken), takes, currentCharId)
  const shortfall = computeBuyShortfall(target, held)
  if (shortfall <= 0) return undefined
  const quantity = computeBuyQuantity(shortfall, offer.maxBuyable, money, offer.price)
  if (quantity <= 0) {
    say(
      `${name}: bought nothing toward ${target}, with ${held} held, since the gold carried buys none`
    )
    return undefined
  }
  say(
    `${name}: ${shortfall} short of ${target}, with ${held} held; ${quantity} ${offer.link} to buy`
  )
  return {
    entryIndex: offer.entryIndex,
    itemId: offer.itemId,
    link: offer.link,
    quantity,
    price: offer.price,
  }
}

function shortfallBuys(this: void, compiled: CompiledConfig, money: number): BuyTarget[] {
  const targets: BuyTarget[] = []
  const rules = compiled.orderedRules.filter(
    (one) => one.buyShortfall === true && one.active !== false && one.action === "stock"
  )
  if (rules.length === 0) return targets
  const offers = storeOffers()
  if (offers.length === 0) return targets
  const ctx: EvalContext = {
    env: buildEsoEvalEnv(),
    priceTableMissing: resolvePriceSource() === "ttc-no-table",
  }
  const currentCharId = tostring(GetCurrentCharacterId())
  let left = money
  for (const rule of rules) {
    const found = shortfallBuyFor(rule, offers, ctx, currentCharId, left)
    if (found === undefined) continue
    targets.push(found)
    left -= found.quantity * found.price
  }
  return targets
}

export function dispatchBuyShortfall(): undefined {
  const compiled = getCompiledConfig()
  if (!compiled) return
  const playerMoney = GetCurrencyAmount(CURT_MONEY, CURRENCY_LOCATION_CHARACTER)
  const targets = shortfallBuys(compiled, playerMoney)

  if (targets.length === 0) return

  function executeBuy(): undefined {
    const boughtLinks: string[] = []
    for (const t of targets) {
      BuyStoreItem(t.entryIndex, t.quantity)
      for (let k = 0; k < t.quantity; k++) boughtLinks.push(t.link)
    }
    if (boughtLinks.length > 0) {
      reportAction("Bought", boughtLinks)
    }
  }

  if (shouldConfirmAction("buy")) {
    const allLinks = targets.flatMap((t) => {
      const repeated: string[] = []
      for (let k = 0; k < t.quantity; k++) repeated.push(t.link)
      return repeated
    })
    const n = allLinks.length
    const summary = `Buy ${n} ${n !== 1 ? "items" : "item"}: ${formatItemList(allLinks)}`
    reportPendingAction("Buy", allLinks)
    showConfirmDialog(summary, function (this: void): undefined {
      executeBuy()
    })
  } else {
    executeBuy()
  }
}
