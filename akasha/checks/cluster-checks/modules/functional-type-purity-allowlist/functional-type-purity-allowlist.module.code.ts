import type { ImportSiteSample } from "../functional-type-import-scan/functional-type-import-scan.module.code.ts"

export interface PurityTypeOnlyAllowlistEntry {
  readonly importer: string
  readonly specifier: string
  readonly names: readonly string[]
}

export const PURITY_TYPE_ONLY_ALLOWLIST: readonly PurityTypeOnlyAllowlistEntry[] = []

function findEntry(
  importer: string,
  specifier: string,
  allowlist: readonly PurityTypeOnlyAllowlistEntry[]
): PurityTypeOnlyAllowlistEntry | undefined {
  for (const entry of allowlist) {
    if (entry.importer === importer && entry.specifier === specifier) return entry
  }
  return undefined
}

export function isWorkspaceDepCoveredByAllowlist(
  importer: string,
  dep: string,
  imports: readonly ImportSiteSample[],
  allowlist: readonly PurityTypeOnlyAllowlistEntry[] = PURITY_TYPE_ONLY_ALLOWLIST
): boolean {
  const entry = findEntry(importer, dep, allowlist)
  if (entry === undefined) return false
  if (imports.length === 0) return false
  const allowedNames = new Set(entry.names)
  for (const sample of imports) {
    if (sample.hasDefaultOrNamespace) return false
    if (!sample.allTypeOnly) return false
    for (const name of sample.names) {
      if (!allowedNames.has(name)) return false
    }
  }
  return true
}
