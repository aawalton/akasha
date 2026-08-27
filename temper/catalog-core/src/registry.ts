import type { DomainKey } from "./domain-keys"

export interface CatalogDomainEntry {
  readonly key: DomainKey
  readonly collect: (this: void, onComplete: (this: void) => void) => void
}

const registry: CatalogDomainEntry[] = []

export function registerCatalogDomain(this: void, entry: CatalogDomainEntry): undefined {
  registry[registry.length] = entry
}

export function getCatalogDomains(this: void): readonly CatalogDomainEntry[] {
  return registry
}
