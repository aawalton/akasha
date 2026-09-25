import type { AchievementCatalogData } from "akasha/temper/capture/shape/modules/achievement-catalog/achievement-catalog.module.code.ts"
import type { AntiquityLoreCatalogEntry } from "akasha/temper/capture/shape/modules/antiquity-lore-catalog/antiquity-lore-catalog.module.code.ts"
import type { CadwellCatalogLevel } from "akasha/temper/capture/shape/modules/cadwell-catalog/cadwell-catalog.module.code.ts"
import type { ClassCatalogEntry } from "akasha/temper/capture/shape/modules/class-catalog/class-catalog.module.code.ts"
import type { CollectiblesCatalogData } from "akasha/temper/capture/shape/modules/collectibles-catalog/collectibles-catalog.module.code.ts"
import type { CompanionEquipmentCatalogData } from "akasha/temper/capture/shape/modules/companion-equipment-catalog/companion-equipment-catalog.module.code.ts"
import type { CompanionSkillCatalogLine } from "akasha/temper/capture/shape/modules/companion-skill-catalog/companion-skill-catalog.module.code.ts"
import type { CurrencyCatalogEntry } from "akasha/temper/capture/shape/modules/currency-catalog/currency-catalog.module.code.ts"
import type { EngineAnswerCatalogData } from "akasha/temper/capture/shape/modules/engine-answer-catalog/engine-answer-catalog.module.code.ts"
import type { EngineGlobalsCatalogData } from "akasha/temper/capture/shape/modules/engine-globals-catalog/engine-globals-catalog.module.code.ts"
import type { FurnitureCatalogData } from "akasha/temper/capture/shape/modules/furniture-catalog/furniture-catalog.module.code.ts"
import type { InterfaceColorCatalogData } from "akasha/temper/capture/shape/modules/interface-color-catalog/interface-color-catalog.module.code.ts"
import type { InterfaceStringCatalogData } from "akasha/temper/capture/shape/modules/interface-string-catalog/interface-string-catalog.module.code.ts"
import type { InventoryConstantsCatalogData } from "akasha/temper/capture/shape/modules/inventory-constants-catalog/inventory-constants-catalog.module.code.ts"
import type { ItemSetCatalogEntry } from "akasha/temper/capture/shape/modules/item-set-catalog/item-set-catalog.module.code.ts"
import type { LoreLibraryCatalogCategory } from "akasha/temper/capture/shape/modules/lore-library-catalog/lore-library-catalog.module.code.ts"
import type { PoiCatalogZone } from "akasha/temper/capture/shape/modules/poi-catalog/poi-catalog.module.code.ts"
import type { RecipeCatalogList } from "akasha/temper/capture/shape/modules/recipe-catalog/recipe-catalog.module.code.ts"
import type { SandboxLibraryCatalogData } from "akasha/temper/capture/shape/modules/sandbox-library-catalog/sandbox-library-catalog.module.code.ts"
import type { ScribingCatalogData } from "akasha/temper/capture/shape/modules/scribing-catalog/scribing-catalog.module.code.ts"
import type { SkillCatalogLine } from "akasha/temper/capture/shape/modules/skill-catalog/skill-catalog.module.code.ts"
import type { TraitResearchCatalogCraftType } from "akasha/temper/capture/shape/modules/trait-research-catalog/trait-research-catalog.module.code.ts"
import type { TributePatronCatalogEntry } from "akasha/temper/capture/shape/modules/tribute-catalog/tribute-catalog.module.code.ts"
import type { ZoneCompletionCatalogZone } from "akasha/temper/capture/shape/modules/zone-completion-catalog/zone-completion-catalog.module.code.ts"

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
  engineGlobalsCatalog?: EngineGlobalsCatalogData
  interfaceColorCatalog?: InterfaceColorCatalogData
  interfaceStringCatalog?: InterfaceStringCatalogData
  engineAnswerCatalog?: EngineAnswerCatalogData
  sandboxLibraryCatalog?: SandboxLibraryCatalogData
  completed: boolean
  collectionSkips?: Record<string, string>
  apiVersion?: string
  manifestApiVersion?: number
  lastSeenInvalidateVersion?: number
  perf?: { loadTimeMs: number }
}
