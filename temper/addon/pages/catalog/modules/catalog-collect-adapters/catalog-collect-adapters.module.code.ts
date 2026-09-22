import { ADDON_NAME } from "akasha/temper/addon/pages/catalog/modules/catalog-constants/catalog-constants.module.code.ts"
import type { CatalogWalkVerdict } from "akasha/temper/catalog/core/modules/catalog-walk/catalog-walk.module.code.ts"
import { getCatalogDomains } from "akasha/temper/catalog/core/modules/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function runProtected(this: void, run: (this: void) => void): string | undefined {
  const [ok, err] = pcall(run)
  if (ok) return undefined
  return typeof err === "string" ? err : "collector failed with a non-string error"
}

export function scheduleLater(this: void, run: (this: void) => void, delayMs: number): undefined {
  zo_callLater(run, delayMs)
}

export function logLine(this: void, message: string): undefined {
  d(`[${ADDON_NAME}] ${message}`)
}

export function hasCollectedDomain(this: void, domainKey: string): boolean {
  const savedVars = getSavedVariables()
  for (const domain of getCatalogDomains()) {
    if (domain.key === domainKey) return savedVars[domain.key] !== undefined
  }
  return false
}

const REASON_CEILING = 300

function shortened(this: void, reason: string): string {
  const [oneLine] = string.gsub(reason, "%s+", " ")
  if (oneLine.length <= REASON_CEILING) return oneLine
  return string.sub(oneLine, 1, REASON_CEILING)
}

export function writeWalkVerdict(this: void, verdict: CatalogWalkVerdict): undefined {
  const savedVars = getSavedVariables()
  savedVars.completed = verdict.completed
  if (verdict.skips.length === 0) {
    savedVars.collectionSkips = undefined
    return
  }
  const skipRecord: Record<string, string> = {}
  for (const skip of verdict.skips) {
    skipRecord[skip.domain] = shortened(skip.reason)
    d(`[${ADDON_NAME}] Skipped ${skip.domain}: ${skip.reason}`)
  }
  savedVars.collectionSkips = skipRecord
}
