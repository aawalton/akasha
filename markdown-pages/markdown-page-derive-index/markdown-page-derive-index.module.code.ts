import { slugNamed } from "../markdown-page-address/markdown-page-address.module.code.ts"
import type { Reached } from "../markdown-page-reach/markdown-page-reach.module.code.ts"

export function foundIn<Found>(
  index: ReadonlyMap<string, Found>,
  named: string
): Found | undefined {
  return index.get(named) ?? index.get(slugNamed(named))
}

function namedBy(page: Reached, slugProperty: string | null): string | null {
  if (slugProperty === null) return page.named
  const held = page.values[slugProperty]
  return typeof held === "string" && held.trim() !== "" ? held.trim() : null
}

export function indexingOver(
  beneath: (target: string) => readonly string[],
  pagesOf: (kind: string) => Iterable<Reached>
): (target: string, slugProperty: string | null) => ReadonlyMap<string, Reached> {
  const indexes = new Map<string, ReadonlyMap<string, Reached>>()
  return (target, slugProperty) => {
    const at = slugProperty === null ? target : `${target} ${slugProperty}`
    const held = indexes.get(at)
    if (held !== undefined) return held
    const made = new Map<string, Reached>()
    for (const kind of beneath(target))
      for (const page of pagesOf(kind)) {
        const named = namedBy(page, slugProperty)
        if (named !== null && !made.has(named)) made.set(named, page)
      }
    indexes.set(at, made)
    return made
  }
}
