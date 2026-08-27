import type { ClassCatalogEntry } from "@temper/game-characters-capture-core/class-catalog"
import type { SkillCatalogLine } from "@temper/game-characters-capture-core/skill-catalog"
import type { AntiquityLoreCatalogEntry } from "@temper/game-collections-antiquities-capture-core/antiquity-lore-catalog"
import type { CollectiblesCatalogData } from "@temper/game-collections-capture-core/collectibles-catalog"
import type { LoreLibraryCatalogCategory } from "@temper/game-collections-lore-capture-core/lore-library-catalog"
import type { TributePatronCatalogEntry } from "@temper/game-collections-tribute-capture-core/tribute-catalog"
import type { CompanionEquipmentCatalogData } from "@temper/game-companions-capture-core/companion-equipment-catalog"
import type { CompanionSkillCatalogLine } from "@temper/game-companions-capture-core/companion-skill-catalog"
import type { AchievementCatalogData } from "@temper/game-completion-capture-core/achievement-catalog"
import type { CadwellCatalogLevel } from "@temper/game-completion-capture-core/cadwell-catalog"
import type { ZoneCompletionCatalogZone } from "@temper/game-completion-capture-core/zone-completion-catalog"
import type { RecipeCatalogList } from "@temper/game-crafting-capture-core/recipe-catalog"
import type { ScribingCatalogData } from "@temper/game-crafting-capture-core/scribing-catalog"
import type { TraitResearchCatalogCraftType } from "@temper/game-crafting-capture-core/trait-research-catalog"
import type { FurnitureCatalogData } from "@temper/game-housing-capture-core/furniture-catalog"
import type { InventoryConstantsCatalogData } from "@temper/game-items-capture-core/inventory-constants-catalog"
import type { ItemSetCatalogEntry } from "@temper/game-items-capture-core/item-set-catalog"
import type { CurrencyCatalogEntry } from "@temper/game-items-currency-capture-core/currency-catalog"
import type { PoiCatalogZone } from "@temper/game-navigation-capture-core/poi-catalog"

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
