import type { AchievementCategoryCatalogEntry } from "../completion-achievement-progress/completion-achievement-progress.module.code.ts"
import type { AntiquityCatalogCategory } from "../completion-antiquity-lore-progress/completion-antiquity-lore-progress.module.code.ts"
import type { CadwellLevelCatalogEntry } from "../completion-cadwell-lookup/completion-cadwell-lookup.module.code.ts"
import type { CollectibleCatalogCategory } from "../completion-collectibles-progress/completion-collectibles-progress.module.code.ts"
import type { PoiZoneCatalogEntry } from "../completion-poi-progress/completion-poi-progress.module.code.ts"
import type { QuestCatalogZone } from "../completion-quest-progress/completion-quest-progress.module.code.ts"
import type {
  TraitResearchCatalogCraftType,
  TraitResearchCatalogLine,
} from "../completion-trait-research-progress/completion-trait-research-progress.module.code.ts"
import type { TributePatronCatalogEntry } from "../completion-tribute-progress/completion-tribute-progress.module.code.ts"
import type { ZoneCompletionCatalogZone } from "../completion-zone-progress/completion-zone-progress.module.code.ts"

export interface CompletionCatalogs {
  achievementCategories: readonly AchievementCategoryCatalogEntry[]
  antiquityCategories: readonly AntiquityCatalogCategory[]
  cadwellLevels: readonly CadwellLevelCatalogEntry[]
  collectibleCategories: readonly CollectibleCatalogCategory[]
  craftTypes: readonly TraitResearchCatalogCraftType[]
  poiZones: readonly PoiZoneCatalogEntry[]
  questZones: readonly QuestCatalogZone[]
  researchLines: readonly TraitResearchCatalogLine[]
  tributePatrons: readonly TributePatronCatalogEntry[]
  zoneCompletionZones: readonly ZoneCompletionCatalogZone[]
}

export const NO_COMPLETION_CATALOGS: CompletionCatalogs = {
  achievementCategories: [],
  antiquityCategories: [],
  cadwellLevels: [],
  collectibleCategories: [],
  craftTypes: [],
  poiZones: [],
  questZones: [],
  researchLines: [],
  tributePatrons: [],
  zoneCompletionZones: [],
}
