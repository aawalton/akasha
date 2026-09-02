import type { AchievementCatalogData } from "@akasha/temper-capture-shapes/achievement-catalog"
import type { AntiquityLoreCatalogEntry } from "@akasha/temper-capture-shapes/antiquity-lore-catalog"
import type { CadwellCatalogLevel } from "@akasha/temper-capture-shapes/cadwell-catalog"
import type { ClassCatalogEntry } from "@akasha/temper-capture-shapes/class-catalog"
import type { CollectiblesCatalogData } from "@akasha/temper-capture-shapes/collectibles-catalog"
import type { CompanionEquipmentCatalogData } from "@akasha/temper-capture-shapes/companion-equipment-catalog"
import type { CompanionSkillCatalogLine } from "@akasha/temper-capture-shapes/companion-skill-catalog"
import type { CurrencyCatalogEntry } from "@akasha/temper-capture-shapes/currency-catalog"
import type { FurnitureCatalogData } from "@akasha/temper-capture-shapes/furniture-catalog"
import type { InventoryConstantsCatalogData } from "@akasha/temper-capture-shapes/inventory-constants-catalog"
import type { ItemSetCatalogEntry } from "@akasha/temper-capture-shapes/item-set-catalog"
import type { LoreLibraryCatalogCategory } from "@akasha/temper-capture-shapes/lore-library-catalog"
import type { PoiCatalogZone } from "@akasha/temper-capture-shapes/poi-catalog"
import type { RecipeCatalogList } from "@akasha/temper-capture-shapes/recipe-catalog"
import type { ScribingCatalogData } from "@akasha/temper-capture-shapes/scribing-catalog"
import type { SkillCatalogLine } from "@akasha/temper-capture-shapes/skill-catalog"
import type { TraitResearchCatalogCraftType } from "@akasha/temper-capture-shapes/trait-research-catalog"
import type { TributePatronCatalogEntry } from "@akasha/temper-capture-shapes/tribute-catalog"
import type { ZoneCompletionCatalogZone } from "@akasha/temper-capture-shapes/zone-completion-catalog"

export interface CatalogPayload {
  achievementCatalog?: AchievementCatalogData
  recipeCatalog?: Record<number, RecipeCatalogList>
  loreLibraryCatalog?: Record<number, LoreLibraryCatalogCategory>
  antiquityLoreCatalog?: Record<number, AntiquityLoreCatalogEntry>
  cadwellCatalog?: Record<number, CadwellCatalogLevel>
  itemSetCatalog?: Record<number, ItemSetCatalogEntry>
  scribingCatalog?: ScribingCatalogData
  traitResearchCatalog?: Record<number, TraitResearchCatalogCraftType>
  collectiblesCatalog?: CollectiblesCatalogData

  tributeCatalog?: Record<number, TributePatronCatalogEntry>
  zoneCompletionCatalog?: Record<number, ZoneCompletionCatalogZone>
  poiCatalog?: Record<number, PoiCatalogZone>
  companionEquipmentCatalog?: CompanionEquipmentCatalogData
  currencyCatalog?: Record<number, CurrencyCatalogEntry>
  inventoryConstantsCatalog?: InventoryConstantsCatalogData
  furnitureCatalog?: FurnitureCatalogData
  classCatalog?: Record<number, ClassCatalogEntry>
  companionSkillCatalog?: Record<number, CompanionSkillCatalogLine>
  skillCatalog?: Record<number, SkillCatalogLine>
  completed: boolean
  collectionSkips?: Record<string, string>
  apiVersion?: string
  manifestApiVersion?: number
  lastSeenInvalidateVersion?: number
  perf?: { loadTimeMs: number }
}
