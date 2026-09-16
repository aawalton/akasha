import {
  loopsIn,
  takenIn,
} from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { parents } from "akasha/graph/predicate/pages/parents/parents.graph-predicate.ts"
import { namesIn } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const DOMAIN = "domain"

export const THE_WHOLE = "akasha"

const PARTS = "parts"

const PART_SLUGS = "part-slugs"

const WAS_PARTS = "partSlugs"

const ONE = 1

export function theWhole(path: string): boolean {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return false
  return said.pageType === DOMAIN && said.slug === THE_WHOLE
}

export function partsOf(value: Value | null): readonly string[] {
  const held = value === null ? null : (value[PARTS] ?? value[WAS_PARTS])
  return held === null || held === undefined ? [] : namesIn(held)
}

export function namersOf(shadow: Shadow, id: string): readonly string[] {
  const held = shadow.index.idsNaming(id, PARTS)
  return held.length === 0 ? shadow.index.idsNaming(id, PART_SLUGS) : held
}

function reasonFor(shown: string): string {
  return (
    `no page names \`${shown}\` among its parts — every page under ` +
    `\`${DOMAIN}\` but \`${DOMAIN}/${THE_WHOLE}\` is a part of a page above it`
  )
}

function sharedReason(shown: string, namers: number): string {
  return (
    `${String(namers)} pages name \`${shown}\` among their parts — every page under ` +
    `\`${DOMAIN}\` but \`${DOMAIN}/${THE_WHOLE}\` is a part of exactly one page above it`
  )
}

function loopReason(shown: string): string {
  return (
    `the pages above \`${shown}\` loop rather than reaching \`${DOMAIN}/${THE_WHOLE}\` — ` +
    `every page under \`${DOMAIN}\` is reached by reading down from the whole`
  )
}

export type Judging = (id: string, shown: string) => string | null

export function judgingBy(shadow: Shadow): Judging {
  return (id, shown) => {
    const listed = shadow.index.listedById(id)
    if (listed === null) return reasonFor(shown)
    const taken = takenIn(parents, [listed.path], { index: shadow.index })
    const namers = taken.edges.filter((one) => one.to === listed.path)
    if (namers.length === 0) return reasonFor(shown)
    if (namers.length > ONE) return sharedReason(shown, namers.length)
    return loopsIn(taken).length > 0 ? loopReason(shown) : null
  }
}
