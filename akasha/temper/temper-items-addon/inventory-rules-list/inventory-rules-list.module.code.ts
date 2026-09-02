import { postGuildStoreItem } from "@akasha/temper-trading-post/guild-store-poster"
import { requireAt } from "@akasha/utils-narrow/require-at"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import {
  clearPendingAction,
  forEachPendingAction,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { isVendorCrossCharDestination } from "../inventory-rules-cross-char/inventory-rules-cross-char.module.code.ts"
export interface ListingCandidate {
  bagId: number
  slotIndex: number
  stackCount: number
  totalPrice: number
  itemLink: string
}

export function computeListPrice(itemLink: string, stackCount: number): number | undefined {
  if (TamrielTradeCentrePrice === undefined) return undefined
  const priceInfo = TamrielTradeCentrePrice.GetPriceInfo(itemLink)
  if (priceInfo === undefined || priceInfo.SuggestedPrice === undefined) return undefined
  return math.floor(priceInfo.SuggestedPrice * stackCount)
}

export let tradingHouseOpen = false

let inFlightListing: string | undefined

export function onTradingHouseClosed(): undefined {
  tradingHouseOpen = false
  inFlightListing = undefined
}

export type PostResponseOutcome = "success" | "failure" | "ignore"

export function classifyPostResponse(
  this: void,
  responseType: number,
  result: number
): PostResponseOutcome {
  if (responseType !== TRADING_HOUSE_RESULT_POST_PENDING) return "ignore"
  return result === TRADING_HOUSE_RESULT_SUCCESS ? "success" : "failure"
}

function postFailureReason(this: void, code: number): string {
  const localized = GetString("SI_TRADINGHOUSERESULT", code)
  if (localized !== undefined && localized !== "") return localized
  return `error ${code}`
}

function warnListingFailed(this: void, itemLink: string, reason: string): undefined {
  d(`[${ADDON_NAME}] Could not list ${itemLink}: ${reason} — not listed.`)
}

function onListingResponse(
  this: void,
  _eventCode: number,
  responseType: number,
  result: number
): undefined {
  const outcome = classifyPostResponse(responseType, result)
  if (outcome === "ignore") return
  const itemLink = inFlightListing
  inFlightListing = undefined
  if (outcome === "success") return
  if (itemLink === undefined) return
  warnListingFailed(itemLink, postFailureReason(result))
}

function onListingError(this: void, _eventCode: number, errorCode: number): undefined {
  const itemLink = inFlightListing
  if (itemLink === undefined) return
  inFlightListing = undefined
  warnListingFailed(itemLink, postFailureReason(errorCode))
}

export function registerAutoListResultEvents(this: void, ns: string): undefined {
  EVENT_MANAGER.RegisterForEvent(
    `${ns}_ListResponse`,
    EVENT_TRADING_HOUSE_RESPONSE_RECEIVED,
    onListingResponse
  )
  EVENT_MANAGER.RegisterForEvent(`${ns}_ListError`, EVENT_TRADING_HOUSE_ERROR, onListingError)
}

export function dispatchListings(): undefined {
  tradingHouseOpen = true

  if (TamrielTradeCentrePrice === undefined) {
    d(`[${ADDON_NAME}] TTC addon required for auto-listing`)
    return
  }

  const guildId = GetSelectedTradingHouseGuildId()
  if (guildId === undefined || !CanSellOnTradingHouse(guildId)) {
    d(`[${ADDON_NAME}] Cannot sell on this trading house`)
    return
  }

  const [currentListings, maxListings] = GetTradingHouseListingCounts()
  let slotsRemaining = maxListings - currentListings
  if (slotsRemaining <= 0) {
    d(`[${ADDON_NAME}] Guild store listing slots full (${currentListings}/${maxListings})`)
    return
  }

  const candidates: ListingCandidate[] = []
  let skipped = 0

  forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
    if (action !== "list") return

    if (isVendorCrossCharDestination(destination)) return

    const [stackCount] = GetSlotStackSize(bagId, slotIndex)
    if (stackCount === 0) {
      clearPendingAction(bagId, slotIndex)
      return
    }

    if (!IsItemSellableOnTradingHouse(bagId, slotIndex)) {
      clearPendingAction(bagId, slotIndex)
      return
    }

    const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)
    const totalPrice = computeListPrice(itemLink, stackCount)
    if (totalPrice === undefined) {
      skipped++
      return
    }

    candidates.push({ bagId, slotIndex, stackCount, totalPrice, itemLink })
  })

  if (candidates.length === 0) {
    if (skipped > 0) {
      d(`[${ADDON_NAME}] No items to list (${skipped} skipped — no price data)`)
    }
    return
  }

  table.sort(candidates, function (this: void, a: ListingCandidate, b: ListingCandidate): boolean {
    return a.totalPrice > b.totalPrice
  })

  while (candidates.length > slotsRemaining) {
    candidates.pop()
  }

  let posted = 0
  let totalFees = 0
  let queueIndex = 0
  const postedLinks: string[] = []

  function postNextItem(): undefined {
    if (!tradingHouseOpen) {
      printSummary()
      return
    }

    if (queueIndex >= candidates.length) {
      printSummary()
      return
    }

    const cooldown = GetTradingHouseCooldownRemaining()
    if (cooldown > 0) {
      zo_callLater(postNextItem, cooldown + 100)
      return
    }

    const candidate = requireAt(candidates, queueIndex, "candidates")
    queueIndex++

    const [stackCount] = GetSlotStackSize(candidate.bagId, candidate.slotIndex)
    if (stackCount === 0) {
      clearPendingAction(candidate.bagId, candidate.slotIndex)
      postNextItem()
      return
    }

    const [listingFee] = GetTradingHousePostPriceInfo(candidate.totalPrice)
    const gold = GetCurrencyAmount(CURT_MONEY, CURRENCY_LOCATION_CHARACTER)
    if (gold < listingFee) {
      d(`[${ADDON_NAME}] Cannot afford listing fee (${listingFee}g, have ${gold}g) — stopping`)
      printSummary()
      return
    }

    postGuildStoreItem(
      candidate.bagId,
      candidate.slotIndex,
      candidate.stackCount,
      candidate.totalPrice
    )
    inFlightListing = candidate.itemLink
    clearPendingAction(candidate.bagId, candidate.slotIndex)
    postedLinks.push(candidate.itemLink)
    posted++
    totalFees += listingFee

    zo_callLater(postNextItem, 1000)
  }

  function printSummary(): undefined {
    const skippedMsg = skipped > 0 ? ` (${skipped} skipped — no price data)` : ""
    const itemsMsg = postedLinks.length > 0 ? `: ${postedLinks.join(", ")}` : ""
    d(
      `[${ADDON_NAME}] Listed ${posted} items${skippedMsg}${itemsMsg}. Listing fees: ${totalFees} gold.`
    )
  }

  postNextItem()
}
