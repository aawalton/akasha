import type { MinedItemsUploaded } from "akasha/temper/addon/pages/catalog/modules/datamining-uploaded-items/datamining-uploaded-items.module.code.ts"
import type { PendingInvalidation } from "akasha/temper/catalog/core/modules/apply-invalidations/apply-invalidations.module.code.ts"
import "akasha/temper/addon/pages/catalog/catalog-config-global/catalog-config-global.type-declaration.d.ts"

function isStringArray(value: unknown): value is readonly string[] {
  if (!Array.isArray(value)) return false
  for (const element of value) {
    if (typeof element !== "string") return false
  }
  return true
}

function isCatalogConfig(value: unknown): value is TemperCatalogConfigGlobal {
  if (typeof value !== "object" || value === null) return false
  if (!("version" in value)) return false
  if (!("invalidateVersion" in value)) return false
  if (typeof value.version !== "number" || typeof value.invalidateVersion !== "number") return false
  if ("invalidateDomains" in value && value.invalidateDomains !== undefined) {
    return isStringArray(value.invalidateDomains)
  }
  return true
}

export function getPendingInvalidation(): PendingInvalidation | undefined {
  const candidate: unknown = globalThis.TemperCatalogConfig
  if (!isCatalogConfig(candidate)) return undefined
  if (candidate.version <= 0) return undefined
  return {
    version: candidate.version,
    invalidateVersion: candidate.invalidateVersion,
    invalidateDomains: candidate.invalidateDomains ?? [],
  }
}

export function getMinedItemsUploaded(): MinedItemsUploaded | undefined {
  const candidate: unknown = globalThis.TemperCatalogConfig
  if (!isCatalogConfig(candidate)) return undefined
  const uploaded: unknown = candidate.minedItemsUploaded
  if (typeof uploaded !== "object" || uploaded === null) return undefined
  if (!("apiVersion" in uploaded) || !("throughItemId" in uploaded)) return undefined
  if (typeof uploaded.apiVersion !== "string") return undefined
  if (typeof uploaded.throughItemId !== "number") return undefined
  return { apiVersion: uploaded.apiVersion, throughItemId: uploaded.throughItemId }
}

export interface LandedMark {
  readonly apiVersion: string
  readonly invalidateVersion: number
}

function isLandedMark(value: unknown): value is LandedMark {
  if (typeof value !== "object" || value === null) return false
  if (!("apiVersion" in value) || !("invalidateVersion" in value)) return false
  return typeof value.apiVersion === "string" && typeof value.invalidateVersion === "number"
}

export function getLandedMark(domainKey: string): LandedMark | undefined {
  const candidate: unknown = globalThis.TemperCatalogConfig
  if (!isCatalogConfig(candidate)) return undefined
  const landed: unknown = candidate.landedCatalogs
  if (typeof landed !== "object" || landed === null) return undefined
  const mark: unknown = candidate.landedCatalogs?.[domainKey]
  return isLandedMark(mark) ? mark : undefined
}
