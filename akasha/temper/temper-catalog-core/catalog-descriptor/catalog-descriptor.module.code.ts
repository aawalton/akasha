import type { CaptureDescriptor } from "@akasha/temper-capture-descriptor/descriptor"
import type { CatalogPayload } from "../catalog-payload/catalog-payload.module.code.ts"

const DEFAULTS: CatalogPayload = {
  achievementCatalog: undefined,
  recipeCatalog: undefined,
  loreLibraryCatalog: undefined,
  antiquityLoreCatalog: undefined,
  cadwellCatalog: undefined,
  itemSetCatalog: undefined,
  scribingCatalog: undefined,
  traitResearchCatalog: undefined,
  collectiblesCatalog: undefined,

  tributeCatalog: undefined,
  zoneCompletionCatalog: undefined,
  poiCatalog: undefined,
  companionEquipmentCatalog: undefined,
  inventoryConstantsCatalog: undefined,
  currencyCatalog: undefined,
  furnitureCatalog: undefined,
  classCatalog: undefined,
  companionSkillCatalog: undefined,
  skillCatalog: undefined,
  completed: false,
  collectionSkips: undefined,
  apiVersion: undefined,
  manifestApiVersion: undefined,
  lastSeenInvalidateVersion: 0,
}

export const CATALOG_CAPTURE_DESCRIPTOR: CaptureDescriptor<CatalogPayload> = {
  addonName: "TemperCatalog",
  savedVariablesName: "TemperCatalog_SavedVariables",
  version: 1,
  defaults: DEFAULTS,
  perf: true,
}
