import { applyPendingInvalidations } from "../../catalog-core/apply-invalidations/apply-invalidations.module.code.ts"
import { getCatalogDomains } from "../../catalog-core/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "../../catalog-core/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import { ADDON_NAME } from "../catalog-constants/catalog-constants.module.code.ts"
import { getPendingInvalidation } from "../catalog-side-file-config/catalog-side-file-config.module.code.ts"

export function applyHostInvalidations(): undefined {
  const savedVars = getSavedVariables()
  const allKeys = getCatalogDomains().map((entry) => entry.key)
  const presentDomainKeys = allKeys.filter((key) => savedVars[key] !== undefined)
  const result = applyPendingInvalidations(
    {
      lastSeenInvalidateVersion: savedVars.lastSeenInvalidateVersion ?? 0,
      completed: savedVars.completed,
      presentDomainKeys,
    },
    getPendingInvalidation(),
    allKeys
  )
  if (result.kind === "noop") return

  const nextPresent = new Set(result.next.presentDomainKeys)
  for (const key of allKeys) {
    if (!nextPresent.has(key)) savedVars[key] = undefined
  }
  savedVars.completed = result.next.completed
  savedVars.collectionSkips = undefined
  savedVars.lastSeenInvalidateVersion = result.next.lastSeenInvalidateVersion
  d(
    `[${ADDON_NAME}] Applied side-file invalidation v${savedVars.lastSeenInvalidateVersion}; will re-collect on next login.`
  )
}
