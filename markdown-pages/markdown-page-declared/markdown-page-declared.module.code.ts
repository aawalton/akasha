import { onceInCall } from "@akasha/command-system/during-call"
import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { pageStemOf } from "@akasha/pages-system/markdown-page-name"
import type { Property } from "@akasha/pages-system/markdown-property"
import { rootsKey } from "../markdown-file-tree/markdown-file-tree.module.code.ts"
import type { Held } from "../markdown-page-file-values/markdown-page-file-values.module.code.ts"
import {
  type Filed,
  filedIn,
  PAGE_TYPE_GLOBS,
  repoPlacings,
  scanIn,
} from "../markdown-page-types/markdown-page-types.module.code.ts"
import type { Held as Declaring } from "../markdown-property-stating/markdown-property-stating.module.code.ts"
import { blockOf, stringAt, textAt } from "../markdown-text-at/markdown-text-at.module.code.ts"

export const FROM = "from"

export const BACK = "back-from"

export const TARGET = "target-slug"

export const EXTENDS = "extends-slug"

export const EXPRESSION = "expression"

export const ROWS = "rows"

export const RELATION = "relation"

export const REDUCTION = "function"

export const OVER = "target"

export const NAMED_FOR = "named-for"

export interface Kind {
  readonly filed: readonly Filed[]
  readonly above: string | null
  readonly namedFor: string | null
}

export function fallbackOf(one: Property): Held {
  const held: Declaring | null = one.default
  if (typeof held === "string") return held.trim() === "" ? null : held.trim()
  if (!Array.isArray(held)) return null
  const listed = held
    .filter((each): each is string => typeof each === "string")
    .map((each) => each.trim())
  return listed.length === 0 ? null : listed
}

export function declaringRoot(roots: Roots): string {
  return rootFor(roots, AKASHA)
}

// The index answered this over the akasha root and the disk answered it everywhere else. Only the
// second reader is left, and it is the one that was already trusted off that root.
function kindPathsIn(root: string, globs: readonly string[]): readonly string[] {
  return scanIn(root, globs, AKASHA)
}

export function kindsIn(roots: Roots): ReadonlyMap<string, Kind> {
  return onceInCall(`page-type-kinds:${rootsKey(roots)}`, () => {
    const placed = repoPlacings(roots)
    const root = declaringRoot(roots)
    const kinds = new Map<string, Kind>()
    for (const relPath of kindPathsIn(root, PAGE_TYPE_GLOBS)) {
      const text = textAt(root, relPath)
      if (text === null) continue
      const { fm, why } = blockOf(text)
      if (why !== null) continue
      const slug = pageStemOf(relPath)
      if (kinds.has(slug)) continue
      const stated = filedIn(fm)
      const fallback = placed.get(slug) ?? null
      kinds.set(slug, {
        filed: stated ?? (fallback === null ? [] : [{ repo: fallback, place: null }]),
        above: stringAt(fm, EXTENDS),
        namedFor: stringAt(fm, NAMED_FOR),
      })
    }
    return kinds
  })
}
