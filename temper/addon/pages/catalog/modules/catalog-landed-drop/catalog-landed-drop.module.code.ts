import { ADDON_NAME } from "akasha/temper/addon/pages/catalog/modules/catalog-constants/catalog-constants.module.code.ts"
import {
  getLandedMark,
  type LandedMark,
} from "akasha/temper/addon/pages/catalog/modules/catalog-side-file-config/catalog-side-file-config.module.code.ts"
import type {
  CatalogPayload,
  LandedCatalogStub,
} from "akasha/temper/catalog/core/modules/catalog-payload/catalog-payload.module.code.ts"
import type { DomainKey } from "akasha/temper/catalog/core/modules/domain-keys/domain-keys.module.code.ts"
import { getCatalogDomains } from "akasha/temper/catalog/core/modules/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const LANDED_STUB: LandedCatalogStub = { landed: true }

function isStub(this: void, held: unknown): boolean {
  return typeof held === "object" && held !== null && "landed" in held && held.landed === true
}

export function droppedForLanding(
  this: void,
  savedVars: CatalogPayload,
  keys: readonly DomainKey[],
  markOf: (this: void, key: DomainKey) => LandedMark | undefined
): readonly DomainKey[] {
  const tables: Partial<Record<DomainKey, unknown>> = savedVars
  const dropped: DomainKey[] = []
  for (const key of keys) {
    const held = tables[key]
    if (held === undefined || isStub(held)) continue
    const mark = markOf(key)
    if (mark === undefined) continue
    if (mark.apiVersion !== savedVars.apiVersion) continue
    if (mark.invalidateVersion !== (savedVars.lastSeenInvalidateVersion ?? 0)) continue
    tables[key] = LANDED_STUB
    dropped.push(key)
  }
  return dropped
}

export function dropLandedCatalogs(this: void): undefined {
  const keys = getCatalogDomains().map((entry) => entry.key)
  const dropped = droppedForLanding(getSavedVariables(), keys, getLandedMark)
  if (dropped.length === 0) return
  d(`[${ADDON_NAME}] ${dropped.length} catalog(s) already in akasha are kept as a mark alone.`)
}
