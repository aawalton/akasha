import { namesIn } from "@akasha/indexes/reaching"
import { partedIn } from "@akasha/pages/page-file-name"
import type { Value } from "@akasha/pages/page-value"
import type { Shadow } from "@akasha/pages/shadow"

export const DOMAIN = "domain"

export const THE_WHOLE = "akasha"

export const PARTS = "parts"

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

function loops(shadow: Shadow, settled: Map<string, boolean>, from: string): boolean {
  const climbing: string[] = []
  const seen = new Set<string>()
  let at = from
  let ended = true
  for (;;) {
    const known = settled.get(at)
    if (known !== undefined) {
      ended = known
      break
    }
    if (seen.has(at)) break
    seen.add(at)
    climbing.push(at)
    const above = namersOf(shadow, at)[0]
    if (above === undefined) {
      ended = false
      break
    }
    at = above
  }
  for (const one of climbing) settled.set(one, ended)
  return ended
}

export type Judging = (id: string, shown: string) => string | null

export function judgingBy(shadow: Shadow): Judging {
  const settled = new Map<string, boolean>()
  return (id, shown) => {
    const namers = namersOf(shadow, id)
    if (namers.length === 0) return reasonFor(shown)
    if (namers.length > ONE) return sharedReason(shown, namers.length)
    return loops(shadow, settled, id) ? loopReason(shown) : null
  }
}
