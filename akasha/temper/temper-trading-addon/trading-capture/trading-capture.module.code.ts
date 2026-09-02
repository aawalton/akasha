import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-globals"
import { ADDON_NAME } from "../trading-constants/trading-constants.module.code.ts"
import { ensureGuild } from "../trading-saved-variables/trading-saved-variables.module.code.ts"

export function captureSearchResults(): undefined {
  const [numItems, currentPage] = GetTradingHouseSearchResultsInfo()
  if (numItems === 0) return

  const [guildId, guildName] = GetCurrentTradingHouseGuildDetails()
  const kioskName = GetGuildOwnedKioskInfo(guildId) ?? ""
  const guild = ensureGuild(guildName, kioskName)
  const now = GetTimeStamp()

  for (let i = 1; i <= numItems; i++) {
    const [
      ,
      itemName,
      displayQuality,
      stackCount,
      sellerName,
      timeRemaining,
      purchasePrice,
      ,
      itemUniqueId,
      purchasePricePerUnit,
    ] = GetTradingHouseSearchResultItemInfo(i)
    const itemLink = GetTradingHouseSearchResultItemLink(i, LINK_STYLE_DEFAULT)
    const uid = Id64ToString(itemUniqueId)
    if (uid === "" || uid === "0") continue

    guild.listings[uid] = {
      itemLink: itemLink,
      itemName: itemName,
      stackCount: stackCount,
      price: purchasePrice,
      pricePerUnit: purchasePricePerUnit,
      sellerName: sellerName,
      timeRemaining: timeRemaining,
      quality: displayQuality,
      capturedAt: now,
    }
  }

  d(`[${ADDON_NAME}] Captured ${numItems} search results (page ${currentPage})`)
}

export function captureOwnListings(): undefined {
  const count = GetNumTradingHouseListings()
  if (count === 0) return

  const [guildId, guildName] = GetCurrentTradingHouseGuildDetails()
  const kioskName = GetGuildOwnedKioskInfo(guildId) ?? ""
  const guild = ensureGuild(guildName, kioskName)
  const now = GetTimeStamp()

  for (let i = 1; i <= count; i++) {
    const [
      ,
      itemName,
      displayQuality,
      stackCount,
      sellerName,
      timeRemaining,
      salePrice,
      ,
      itemUniqueId,
      salePricePerUnit,
    ] = GetTradingHouseListingItemInfo(i)
    const itemLink = GetTradingHouseListingItemLink(i, LINK_STYLE_DEFAULT)
    const uid = Id64ToString(itemUniqueId)
    if (uid === "" || uid === "0") continue

    guild.listings[uid] = {
      itemLink: itemLink,
      itemName: itemName,
      stackCount: stackCount,
      price: salePrice,
      pricePerUnit: salePricePerUnit,
      sellerName: sellerName,
      timeRemaining: timeRemaining,
      quality: displayQuality,
      capturedAt: now,
    }
  }

  d(`[${ADDON_NAME}] Captured ${count} own listings`)
}
