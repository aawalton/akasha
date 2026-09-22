import { internal } from "akasha/temper/addon/pages/capture-sales/modules/histoire-state/histoire-state.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-guild-history-legacy/eso-guild-history-legacy.type-declaration.d.ts"

function getCategoriesForLegacyCategory(this: void, category: number): number[] {
  if (category === GUILD_HISTORY_BANK) {
    return [GUILD_HISTORY_EVENT_CATEGORY_BANKED_ITEM, GUILD_HISTORY_EVENT_CATEGORY_BANKED_CURRENCY]
  } else if (category === GUILD_HISTORY_COMBAT) {
    return [GUILD_HISTORY_EVENT_CATEGORY_AVA_ACTIVITY]
  } else if (category === GUILD_HISTORY_GENERAL) {
    return [
      GUILD_HISTORY_EVENT_CATEGORY_ACTIVITY,
      GUILD_HISTORY_EVENT_CATEGORY_ROSTER,
      GUILD_HISTORY_EVENT_CATEGORY_MILESTONE,
    ]
  } else if (category === GUILD_HISTORY_STORE) {
    return [GUILD_HISTORY_EVENT_CATEGORY_TRADER]
  }
  return []
}

interface HistoryCacheRef {
  GetCategoryCache: (this: HistoryCacheRef, guildId: number, category: number) => unknown
}

function asHistoryCacheRef(value: unknown): HistoryCacheRef {
  return value as HistoryCacheRef
}

function getCachesForLegacyCategory(this: void, guildId: number, category: number): unknown[] {
  const categories = getCategoriesForLegacyCategory(category)
  const historyCache = asHistoryCacheRef(internal.historyCache)
  const caches: unknown[] = []
  for (const i of $range(1, categories.length)) {
    const categoryId = categories[i - 1]
    if (categoryId != null) {
      caches[i - 1] = historyCache.GetCategoryCache(guildId, categoryId)
    }
  }
  return caches
}

internal.GetCategoriesForLegacyCategory = getCategoriesForLegacyCategory
internal.GetCachesForLegacyCategory = getCachesForLegacyCategory
