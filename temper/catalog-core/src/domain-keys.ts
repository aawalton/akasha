import type { CatalogPayload } from "./types"

export const CATALOG_DOMAIN_KEYS = [
  "achievementCatalog",
  "recipeCatalog",
  "loreLibraryCatalog",
  "antiquityLoreCatalog",
  "cadwellCatalog",
  "itemSetCatalog",
  "scribingCatalog",
  "traitResearchCatalog",
  "collectiblesCatalog",
  "tributeCatalog",
  "zoneCompletionCatalog",
  "poiCatalog",
  "companionEquipmentCatalog",
  "currencyCatalog",
  "inventoryConstantsCatalog",
  "furnitureCatalog",
  "classCatalog",
  "companionSkillCatalog",
  "skillCatalog",
] as const

export type DomainKey = (typeof CATALOG_DOMAIN_KEYS)[number]

type CatalogMetadataKey =
  | "completed"
  | "collectionSkips"
  | "apiVersion"
  | "manifestApiVersion"
  | "lastSeenInvalidateVersion"
  | "perf"

type PayloadDomainKey = Exclude<keyof CatalogPayload, CatalogMetadataKey>

type Exact<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false

const _assertKeysMatchPayload: Exact<DomainKey, PayloadDomainKey> = true
void _assertKeysMatchPayload
