import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionEffect } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-effect/companion-metric-effect.module.code.ts"
import {
  type SourceCategoryId,
  sourceCategories,
} from "akasha/temper/player/character/formula-framework/modules/source-category/source-category.module.code.ts"

const CATEGORY: SourceCategoryId = "companion-base"

interface CompanionBaseSource {
  readonly id: string
  readonly categoryId: SourceCategoryId
  readonly effects: readonly CompanionEffect[]
  readonly name: string
}

export function companionBaseSource(): CompanionBaseSource {
  return {
    id: "companion-base-stats",
    name: sourceCategories().data[CATEGORY].name,
    categoryId: CATEGORY,
    effects: companionCatalog().baseStats,
  }
}
