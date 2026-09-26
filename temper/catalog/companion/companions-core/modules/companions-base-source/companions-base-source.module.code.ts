import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionEffect } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-effect/companion-metric-effect.module.code.ts"
import type { SourceCategoryId } from "akasha/temper/player/character/formula-framework/modules/source-category/source-category.module.code.ts"

interface CompanionBaseSource {
  readonly id: string
  readonly categoryId: SourceCategoryId
  readonly effects: readonly CompanionEffect[]
  readonly name: string
}

export function companionBaseSource(): CompanionBaseSource {
  return {
    id: "companion-base-stats",
    name: "Companion Base Stats",
    categoryId: "companion-base",
    effects: companionCatalog().baseStats,
  }
}
