import { asNumber, asOptionalNumber, asRawPrice } from "../price-casts/price-casts.module.code.ts"
import { lib } from "../price-state/price-state.module.code.ts"
import type { NormalizedPrice, RawPrice } from "../price-types/price-types.module.code.ts"

lib.CanTTCPrice = function (this: void): boolean | undefined {
  return TamrielTradeCentrePrice !== undefined ? true : undefined
}

lib.TTCPrice = function (this: void, itemLink: string): RawPrice | undefined {
  if (TamrielTradeCentrePrice === undefined) {
    return undefined
  }
  const info = TamrielTradeCentrePrice.GetPriceInfo(itemLink)
  if (info === undefined) {
    return undefined
  }
  return asRawPrice(info)
}

lib.TTCPriceNormalize = function (this: void, ttc: RawPrice): NormalizedPrice[] | undefined {
  if (ttc === undefined) {
    return undefined
  }
  const prices: NormalizedPrice[] = []
  if (ttc.Avg !== undefined) {
    prices.push({
      type: lib.PRICE_ASK,
      [lib.CURRENCY_TYPE_GOLD]: asNumber(ttc.Avg),
      count: asOptionalNumber(ttc.EntryCount),
    })
  }
  if (ttc.SuggestedPrice !== undefined) {
    prices.push({
      type: lib.PRICE_AVG,
      [lib.CURRENCY_TYPE_GOLD]: asNumber(ttc.SuggestedPrice) / 0.8,
      count: math.ceil(asNumber(ttc.EntryCount) * 0.3),
    })
  }
  if (ttc.SaleAvg !== undefined) {
    prices.push({
      type: lib.PRICE_SALE,
      [lib.CURRENCY_TYPE_GOLD]: asNumber(ttc.SaleAvg),
      saleCount: asOptionalNumber(ttc.SaleEntryCount),
    })
  }
  return prices
}
