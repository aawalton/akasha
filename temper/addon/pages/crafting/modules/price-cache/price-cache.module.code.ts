import { lib } from "akasha/temper/addon/pages/crafting/modules/price-state/price-state.module.code.ts"
import type { RawPrice } from "akasha/temper/addon/pages/crafting/modules/price-types/price-types.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

lib.ResetCacheIfNecessary = function (this: void): undefined {
  const nowTs = GetTimeStamp()
  lib.cache_reset_ts = lib.cache_reset_ts ?? nowTs
  const prevResetTs = lib.cache_reset_ts
  const agoSecs = GetDiffBetweenTimeStamps(nowTs, prevResetTs)
  if (lib.CACHE_DUR_SECONDS < agoSecs) {
    lib.cache = {}
    lib.cache_reset_ts = nowTs
  }
  return undefined
}

lib.GetCachedPrice = function (
  this: void,
  sourceKey: string,
  itemLink: string
): RawPrice | undefined {
  lib.ResetCacheIfNecessary()
  if (lib.cache === undefined || lib.cache[sourceKey] === undefined) {
    return undefined
  }
  if (sourceKey === lib.MM) {
    return undefined
  }
  return lib.cache[sourceKey][itemLink]
}

lib.SetCachedPrice = function (
  this: void,
  sourceKey: string,
  itemLink: string,
  value: RawPrice
): undefined {
  if (sourceKey === lib.MM) {
    return undefined
  }
  lib.cache = lib.cache ?? {}
  lib.cache[sourceKey] = lib.cache[sourceKey] ?? {}
  lib.cache[sourceKey][itemLink] = value
  return undefined
}
