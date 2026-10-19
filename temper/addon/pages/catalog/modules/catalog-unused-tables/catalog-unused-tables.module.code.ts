import { ADDON_NAME } from "akasha/temper/addon/pages/catalog/modules/catalog-constants/catalog-constants.module.code.ts"
import type { CatalogPayload } from "akasha/temper/catalog/core/modules/catalog-payload/catalog-payload.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

interface UnusedTables {
  questCatalog?: unknown
  loreLibraryProbe?: unknown
}

const UNUSED: readonly (keyof UnusedTables)[] = ["questCatalog", "loreLibraryProbe"]

export function withoutUnusedTables(
  this: void,
  savedVars: CatalogPayload & UnusedTables
): readonly (keyof UnusedTables)[] {
  const removed: (keyof UnusedTables)[] = []
  for (const key of UNUSED) {
    if (savedVars[key] === undefined) continue
    savedVars[key] = undefined
    removed.push(key)
  }
  return removed
}

export function dropUnusedTables(this: void): undefined {
  const removed = withoutUnusedTables(getSavedVariables())
  if (removed.length === 0) return
  d(`[${ADDON_NAME}] ${removed.length} table(s) nothing collects any longer are removed.`)
}
