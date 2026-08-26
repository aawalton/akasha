import { stringAt } from "../../page/text/text.ts"
import { frontmatterAt } from "../frontmatter-at/frontmatter-at.ts"
import type { BuildContext } from "../build-context/build-context.ts"
import { slugNamed } from "../../page/page-address.ts"
import { pagesOfType } from "../page-index/page-index.ts"

const PAGE_TYPE = "page-type"

const EXTENDS_KEY = "extends-slug"

const HELD = new WeakMap<BuildContext, ReadonlyMap<string, string | null>>()

export function aboveIn(ctx: BuildContext): ReadonlyMap<string, string | null> {
  const held = HELD.get(ctx)
  if (held !== undefined) return held
  const made = new Map<string, string | null>()
  for (const at of pagesOfType(ctx, PAGE_TYPE)) {
    const fm = frontmatterAt(ctx, at.repo, at.key)
    made.set(at.stem, fm === null ? null : slugNamed(stringAt(fm, EXTENDS_KEY)))
  }
  HELD.set(ctx, made)
  return made
}

export function inheritedIn<Item>(
  ctx: BuildContext,
  declared: ReadonlyMap<string, readonly Item[]>,
  keyOf: (one: Item) => string
): ReadonlyMap<string, readonly Item[]> {
  const above = aboveIn(ctx)
  const made = new Map<string, readonly Item[]>()
  for (const pageType of above.keys()) {
    const held = new Map<string, Item>()
    const walked = new Set<string>()
    let at: string | null = pageType
    while (at !== null && !walked.has(at)) {
      walked.add(at)
      for (const one of declared.get(at) ?? []) {
        const key = keyOf(one)
        if (!held.has(key)) held.set(key, one)
      }
      at = above.get(at) ?? null
    }
    made.set(pageType, [...held.values()])
  }
  return made
}
