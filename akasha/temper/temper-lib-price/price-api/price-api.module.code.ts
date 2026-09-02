import { asNumber, asSourceSet, asString } from "../price-casts/price-casts.module.code.ts"
import { luaTruthy } from "../price-lua-truthy/price-lua-truthy.module.code.ts"
import { lib } from "../price-state/price-state.module.code.ts"
import type {
  NormalizedPrice,
  PriceGoldReturn,
  RawPrice,
  SpreadMetric,
} from "../price-types/price-types.module.code.ts"

lib.ItemLinkToPriceGold = function (
  this: void,
  itemLink: string,
  ...sources: string[]
): PriceGoldReturn {
  const fieldNames = ["SuggestedPrice", "Avg", "avgPrice", "bonanzaPrice", "price", "npcVendor"]
  for (const sourceKey of lib.SourceList()) {
    if (lib.Enabled(sourceKey, sources)) {
      const result = lib.Price(sourceKey, itemLink)
      if (result !== undefined) {
        for (const fieldName of fieldNames) {
          if (luaTruthy(result[fieldName])) {
            return $multi(asNumber(result[fieldName]), sourceKey, fieldName)
          }
        }
      }
    }
  }
  return $multi(undefined, undefined, undefined)
}

lib.ItemLinkToPriceData = function (
  this: void,
  itemLink: string,
  ...sources: string[]
): Record<string, RawPrice | undefined> {
  const result: Record<string, RawPrice | undefined> = {}
  for (const sourceKey of lib.SourceList()) {
    if (lib.Enabled(sourceKey, sources)) {
      result[sourceKey] = lib.Price(sourceKey, itemLink)
    }
  }
  return result
}

lib.ItemLinkToBidAskData = function (
  this: void,
  itemLink: string,
  ...sources: string[]
): NormalizedPrice[] {
  const result: NormalizedPrice[] = []
  for (const sourceKey of lib.SourceList()) {
    if (lib.Enabled(sourceKey, sources)) {
      const normalized = lib.PriceNormalized(sourceKey, itemLink)
      if (normalized !== undefined) {
        for (const data of normalized) {
          data.source = sourceKey
          result.push(data)
        }
      }
    }
  }
  return result
}

lib.ItemLinkToBidAskSpread = function (
  this: void,
  itemLink: string,
  ...sources: string[]
): Record<string, Record<string, SpreadMetric>> {
  const data = lib.ItemLinkToBidAskData(itemLink, ...sources)
  const result: Record<string, Record<string, SpreadMetric>> = {}
  for (const price of data) {
    for (const currency in lib.CurrencyList()) {
      if (price[currency] !== undefined) {
        let record = result[currency]
        if (record === undefined) {
          record = {}
          result[currency] = record
        }
        let metric = record[price.type]
        if (metric === undefined) {
          metric = { sources: {} }
          record[price.type] = metric
        }
        const sourceSet = asSourceSet(metric.sources)
        sourceSet[asString(price.source)] = true

        const value = asNumber(price[currency])
        const count = price.count ?? 1
        if (price.type === lib.PRICE_SALE) {
          metric.sum = (metric.sum ?? 0) + value * count
          metric.count = (metric.count ?? 0) + count
        } else if (
          metric.value === undefined ||
          (price.type === lib.PRICE_BID && value > metric.value) ||
          (price.type === lib.PRICE_ASK && value < metric.value)
        ) {
          metric.value = value
          metric.count = count
        } else if (metric.value === value) {
          metric.count = (metric.count ?? 0) + count
        }
      }
    }
  }
  for (const currency in result) {
    const record = result[currency]
    if (record === undefined) {
      continue
    }
    for (const t in record) {
      const metric = record[t]
      if (metric === undefined) {
        continue
      }
      const flatSources: string[] = []
      const sourceSet = asSourceSet(metric.sources)
      for (const source in sourceSet) {
        flatSources.push(source)
      }
      metric.sources = flatSources
      if (t === lib.PRICE_SALE) {
        metric.value = asNumber(metric.sum) / asNumber(metric.count)
        metric.sum = undefined
      }
    }
  }
  return result
}
