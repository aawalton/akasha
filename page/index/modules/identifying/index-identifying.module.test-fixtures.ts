import type { Identifier } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import type { Identifying } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

export function identifying(held: Record<string, ReadonlyMap<string, Identifier>>): Identifying {
  return (pageTypeSlug) => held[pageTypeSlug] ?? new Map<string, Identifier>()
}
