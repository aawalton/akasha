import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import { buildEsoEvalEnv } from "akasha/temper/addon/pages/items/modules/inventory-eso-eval-env/inventory-eso-eval-env.module.code.ts"
import {
  lookupTtcPricing,
  resolvePriceSource,
} from "akasha/temper/addon/pages/items/modules/inventory-item-data/inventory-item-data.module.code.ts"
import {
  countHeld,
  type RuleTakes,
  ruleStockTarget,
  takerFor,
} from "akasha/temper/addon/pages/items/modules/inventory-rule-held/inventory-rule-held.module.code.ts"
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
import {
  type GuildListing,
  guildMaxPrice,
  guildMissSaid,
  pickGuildListings,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-guild-buy-core/inventory-rules-guild-buy-core.module.code.ts"
import { computeBuyShortfall } from "akasha/temper/items/rules/core/modules/buy-shortfall/buy-shortfall.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { EvalContext } from "akasha/temper/items/rules/eval/modules/eval-env/eval-env.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-14/eso-enums-14.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const NS = `${ADDON_NAME}_GuildBuy`

const PURCHASE_DIALOG = "CONFIRM_TRADING_HOUSE_PURCHASE"

const MAX_PAGES = 3

type Listing = GuildListing<Id64>

interface Job {
  readonly rule: CompiledOrderedRule
  readonly name: string
  readonly target: number
  readonly held: number
  readonly takes: RuleTakes
  readonly itemIds: readonly number[]
  short: number
  itemAt: number
  bought: number
  readonly misses: string[]
}

type Waiting =
  | {
      readonly kind: "match"
      readonly task: number
      readonly resume: (this: void, hashes: readonly number[]) => void
    }
  | { readonly kind: "search"; readonly resume: (this: void, result: number) => void }
  | { readonly kind: "pending"; readonly resume: (this: void) => void }
  | { readonly kind: "purchase"; readonly resume: (this: void, result: number) => void }

let running = false
let waiting: Waiting | undefined
let jobs: Job[] = []
let jobAt = 0
let gold = 0
let boughtLinks: string[] = []

function say(this: void, message: string): undefined {
  d(`[${ADDON_NAME}] ${message}`)
}

function linkOf(this: void, itemId: number): string {
  return `|H1:item:${itemId}:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h`
}

function resultSaid(this: void, code: number): string {
  const localized = GetString("SI_TRADINGHOUSERESULT", code)
  return localized !== "" ? localized : `error ${code}`
}

function releasePurchaseDialog(this: void): undefined {
  if (ZO_Dialogs_IsShowing(PURCHASE_DIALOG)) ZO_Dialogs_ReleaseDialog(PURCHASE_DIALOG)
}

function settle(this: void): Waiting | undefined {
  const was = waiting
  waiting = undefined
  return was
}

function onMatched(this: void, _eventCode: number, taskId: number, count: number): undefined {
  if (waiting?.kind !== "match" || waiting.task !== taskId) return
  const hashes: number[] = []
  for (let i = 1; i <= count; i++) {
    const [, hash] = GetMatchTradingHouseItemNamesResult(taskId, i)
    hashes.push(hash)
  }
  const was = settle()
  if (was?.kind === "match") was.resume(hashes)
}

function onResponse(
  this: void,
  _eventCode: number,
  responseType: number,
  result: number
): undefined {
  if (responseType === TRADING_HOUSE_RESULT_SEARCH_PENDING && waiting?.kind === "search") {
    const was = settle()
    if (was?.kind === "search") was.resume(result)
    return
  }
  if (responseType === TRADING_HOUSE_RESULT_PURCHASE_PENDING && waiting?.kind === "purchase") {
    releasePurchaseDialog()
    const was = settle()
    if (was?.kind === "purchase") was.resume(result)
  }
}

function onPurchasePending(this: void): undefined {
  if (waiting?.kind !== "pending") return
  const was = settle()
  if (was?.kind === "pending") was.resume()
}

function onError(this: void, _eventCode: number, errorCode: number): undefined {
  const was = waiting
  if (was?.kind === "search" || was?.kind === "purchase") {
    settle()
    was.resume(errorCode)
  }
}

function onClosed(this: void): undefined {
  stopGuildBuy()
}

function listen(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent(
    `${NS}_Match`,
    EVENT_MATCH_TRADING_HOUSE_ITEM_NAMES_COMPLETE,
    onMatched
  )
  EVENT_MANAGER.RegisterForEvent(
    `${NS}_Response`,
    EVENT_TRADING_HOUSE_RESPONSE_RECEIVED,
    onResponse
  )
  EVENT_MANAGER.RegisterForEvent(
    `${NS}_Pending`,
    EVENT_TRADING_HOUSE_CONFIRM_ITEM_PURCHASE,
    onPurchasePending
  )
  EVENT_MANAGER.RegisterForEvent(`${NS}_Error`, EVENT_TRADING_HOUSE_ERROR, onError)
  EVENT_MANAGER.RegisterForEvent(`${NS}_Close`, EVENT_CLOSE_TRADING_HOUSE, onClosed)
}

function unlisten(this: void): undefined {
  EVENT_MANAGER.UnregisterForEvent(`${NS}_Match`, EVENT_MATCH_TRADING_HOUSE_ITEM_NAMES_COMPLETE)
  EVENT_MANAGER.UnregisterForEvent(`${NS}_Response`, EVENT_TRADING_HOUSE_RESPONSE_RECEIVED)
  EVENT_MANAGER.UnregisterForEvent(`${NS}_Pending`, EVENT_TRADING_HOUSE_CONFIRM_ITEM_PURCHASE)
  EVENT_MANAGER.UnregisterForEvent(`${NS}_Error`, EVENT_TRADING_HOUSE_ERROR)
  EVENT_MANAGER.UnregisterForEvent(`${NS}_Close`, EVENT_CLOSE_TRADING_HOUSE)
}

export function stopGuildBuy(this: void): undefined {
  if (!running) return
  running = false
  waiting = undefined
  jobs = []
  unlisten()
}

function jobFor(
  this: void,
  rule: CompiledOrderedRule,
  ctx: EvalContext,
  currentCharId: string
): Job | undefined {
  const name = `rule ${rule.id ?? rule.categoryId}`
  const target = ruleStockTarget(rule)
  if (target === undefined) return undefined
  const itemIds = rule.itemIds ?? []
  const takes = takerFor(rule, undefined, ctx)
  const itemTypes = itemIds.map((itemId) => {
    const [itemType] = GetItemLinkItemType(linkOf(itemId))
    return itemType
  })
  const held = countHeld(itemIds.length > 0 ? itemTypes : undefined, takes, currentCharId)
  const short = computeBuyShortfall(target, held)
  if (short <= 0) return undefined
  if (itemIds.length === 0) {
    say(
      `${name}: bought nothing at the guild store toward ${target}, with ${held} held, since it names no item ids to search for`
    )
    return undefined
  }
  return { rule, name, target, held, takes, itemIds, short, itemAt: 0, bought: 0, misses: [] }
}

function whenReady(this: void, act: (this: void) => void): undefined {
  if (!running) return
  const cooldown = GetTradingHouseCooldownRemaining()
  if (cooldown > 0) {
    zo_callLater(() => whenReady(act), cooldown + 100)
    return
  }
  act()
}

function listingAt(this: void, index: number, job: Job, itemId: number): Listing | undefined {
  const [, , , quantity, seller, , price, currencyType, uniqueId, unitPrice] =
    GetTradingHouseSearchResultItemInfo(index)
  if (currencyType !== CURT_MONEY) return undefined
  if (seller === GetDisplayName()) return undefined
  const link = GetTradingHouseSearchResultItemLink(index, LINK_STYLE_BRACKETS)
  if (GetItemLinkItemId(link) !== itemId) return undefined
  if (!job.takes(link, false)) return undefined
  const maxPrice = guildMaxPrice(job.rule.buyMaxPrice, lookupTtcPricing(link).suggestedPrice)
  return { uniqueId, itemId, link, quantity, price, unitPrice, maxPrice }
}

function lastWithinPrice(this: void, count: number, job: Job): boolean {
  if (count === 0) return false
  const [, , , , , , , , , unitPrice] = GetTradingHouseSearchResultItemInfo(count)
  const link = GetTradingHouseSearchResultItemLink(count, LINK_STYLE_BRACKETS)
  const maxPrice = guildMaxPrice(job.rule.buyMaxPrice, lookupTtcPricing(link).suggestedPrice)
  return maxPrice !== undefined && unitPrice <= maxPrice
}

function readPages(
  this: void,
  job: Job,
  itemId: number,
  link: string,
  page: number,
  listings: Listing[]
): undefined {
  whenReady(() => {
    waiting = {
      kind: "search",
      resume: (result) => {
        if (result !== TRADING_HOUSE_RESULT_SUCCESS) {
          job.misses.push(`${link}: the search failed (${resultSaid(result)})`)
          nextItem()
          return
        }
        const [count, , hasMorePages] = GetTradingHouseSearchResultsInfo()
        for (let index = 1; index <= count; index++) {
          const listing = listingAt(index, job, itemId)
          if (listing !== undefined) listings.push(listing)
        }
        if (hasMorePages && page + 1 < MAX_PAGES && lastWithinPrice(count, job)) {
          readPages(job, itemId, link, page + 1, listings)
          return
        }
        buyListings(job, link, listings)
      },
    }
    ExecuteTradingHouseSearch(page, TRADING_HOUSE_SORT_SALE_PRICE_PER_UNIT, true, false)
  })
}

function searchItem(this: void, job: Job, itemId: number): undefined {
  const link = linkOf(itemId)
  ClearAllTradingHouseSearchTerms()
  const task = MatchTradingHouseItemNames(`"${GetItemLinkTradingHouseItemSearchName(link)}"`)
  if (task === undefined) {
    job.misses.push(`${link}: the guild store would not search for its name`)
    nextItem()
    return
  }
  waiting = {
    kind: "match",
    task,
    resume: (hashes) => {
      const hash = hashes[0]
      if (hash === undefined) {
        job.misses.push(`${link}: ${guildMissSaid("none-listed")}`)
        nextItem()
        return
      }
      SetTradingHouseFilter(TRADING_HOUSE_FILTER_TYPE_NAME_HASH, hash)
      readPages(job, itemId, link, 0, [])
    },
  }
}

function buyListings(this: void, job: Job, link: string, listings: readonly Listing[]): undefined {
  const picked = pickGuildListings(listings, job.short, gold)
  if (picked.miss !== undefined) {
    job.misses.push(`${link}: ${guildMissSaid(picked.miss)}`)
    nextItem()
    return
  }
  const picks = picked.picks
  const each: string[] = []
  let cost = 0
  for (const pick of picks) {
    cost += pick.price
    for (let k = 0; k < pick.quantity; k++) each.push(pick.link)
  }
  say(
    `${job.name}: ${job.short} short of ${job.target}, with ${job.held} held; ${each.length} ${link} to buy at the guild store for ${cost} gold`
  )
  if (!shouldConfirmAction("buy")) {
    purchaseNext(job, picks, 0)
    return
  }
  reportPendingAction("Buy", each)
  showConfirmDialog(
    `Buy at the guild store ${each.length} ${each.length !== 1 ? "items" : "item"} for ${cost} gold: ${formatItemList(each)}`,
    () => {
      purchaseNext(job, picks, 0)
    }
  )
}

function purchaseNext(this: void, job: Job, picks: readonly Listing[], at: number): undefined {
  if (!running) return
  const pick = picks[at]
  if (pick === undefined) {
    nextItem()
    return
  }
  if (pick.price > gold || pick.quantity > job.short) {
    purchaseNext(job, picks, at + 1)
    return
  }
  waiting = {
    kind: "pending",
    resume: () => {
      waiting = {
        kind: "purchase",
        resume: (result) => {
          if (result === TRADING_HOUSE_RESULT_SUCCESS) {
            job.short -= pick.quantity
            job.bought += pick.quantity
            gold -= pick.price
            for (let k = 0; k < pick.quantity; k++) boughtLinks.push(pick.link)
          } else {
            job.misses.push(`${pick.link}: the purchase failed (${resultSaid(result)})`)
          }
          zo_callLater(() => purchaseNext(job, picks, at + 1), 250)
        },
      }
      ConfirmPendingItemPurchase()
      releasePurchaseDialog()
    },
  }
  SetPendingItemPurchaseByItemUniqueId(pick.uniqueId, pick.price)
}

function closeJob(this: void, job: Job): undefined {
  if (job.bought > 0 || job.misses.length === 0) return
  say(
    `${job.name}: bought nothing at the guild store toward ${job.target}, with ${job.held} held, since ${job.misses.join("; ")}`
  )
}

function nextItem(this: void): undefined {
  if (!running) return
  const job = jobs[jobAt]
  if (job === undefined) {
    if (boughtLinks.length > 0) reportAction("Bought at the guild store", boughtLinks)
    stopGuildBuy()
    return
  }
  const itemId = job.itemIds[job.itemAt]
  if (job.short <= 0 || itemId === undefined) {
    closeJob(job)
    jobAt++
    nextItem()
    return
  }
  job.itemAt++
  searchItem(job, itemId)
}

export function dispatchGuildBuyShortfall(this: void): undefined {
  if (running) return
  const compiled = getCompiledConfig()
  if (!compiled) return
  const rules = compiled.orderedRules.filter(
    (one) => one.buyShortfall === true && one.active !== false && one.action === "stock"
  )
  if (rules.length === 0) return
  const ctx: EvalContext = {
    env: buildEsoEvalEnv(),
    priceTableMissing: resolvePriceSource() === "ttc-no-table",
  }
  const currentCharId = tostring(GetCurrentCharacterId())
  const found: Job[] = []
  for (const rule of rules) {
    const job = jobFor(rule, ctx, currentCharId)
    if (job !== undefined) found.push(job)
  }
  if (found.length === 0) return
  running = true
  jobs = found
  jobAt = 0
  gold = GetCurrencyAmount(CURT_MONEY, CURRENCY_LOCATION_CHARACTER)
  boughtLinks = []
  listen()
  nextItem()
}
