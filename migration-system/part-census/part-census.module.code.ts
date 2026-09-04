import { everyOfType } from "@akasha/indexes"
import { namedUnder } from "@akasha/pages-system/page-file-name"
import { shadowAt } from "@akasha/pages-system/shadow"

const DOMAIN = "domain"

const THE_WHOLE = "akasha"

const PART_SLUGS = "part-slugs"

const PARTED_BY = "/"

export type Filed = {
  readonly id: string
  readonly path: string
}

export type Unnamed = {
  readonly path: string
  readonly shown: string
}

export type Naming = {
  readonly kinds: ReadonlySet<string>
  readonly pagesOf: (kind: string) => readonly Filed[]
  readonly shownOf: (path: string) => string | null
  readonly namersOf: (id: string) => number
}

export type Census = {
  readonly kinds: number
  readonly judged: number
  readonly unnamed: readonly Unnamed[]
  readonly byKind: ReadonlyMap<string, number>
}

export function namingAt(root: string): Naming {
  const shadow = shadowAt(root)
  const under = shadow.index.kindsUnder(DOMAIN)
  return {
    kinds: under,
    pagesOf: (kind) => everyOfType(root, kind).map((one) => ({ id: one.id, path: one.path })),
    shownOf: (path) => {
      const held = namedUnder(path, under)
      if (held === null) return null
      if (held.pageTypeSlug === DOMAIN && held.slug === THE_WHOLE) return null
      return `${held.pageTypeSlug}${PARTED_BY}${held.slug}`
    },
    namersOf: (id) => shadow.index.idsNaming(id, PART_SLUGS).length,
  }
}

export function censusIn(naming: Naming): Census {
  const unnamed: Unnamed[] = []
  const byKind = new Map<string, number>()
  let judged = 0
  for (const kind of naming.kinds) {
    for (const one of naming.pagesOf(kind)) {
      const shown = naming.shownOf(one.path)
      if (shown === null) continue
      judged += 1
      byKind.set(kind, (byKind.get(kind) ?? 0) + 1)
      if (naming.namersOf(one.id) > 0) continue
      unnamed.push({ path: one.path, shown })
    }
  }
  unnamed.sort((one, two) => (one.shown < two.shown ? -1 : one.shown > two.shown ? 1 : 0))
  return { kinds: naming.kinds.size, judged, unnamed, byKind }
}

export function censusOver(root: string): Census {
  return censusIn(namingAt(root))
}

export function pathsIn(census: Census): readonly string[] {
  return census.unnamed.map((one) => one.path)
}

export function countedIn(census: Census): readonly string[] {
  return [...census.byKind]
    .sort((one, two) => two[1] - one[1])
    .map(([kind, howMany]) => `  ${kind}: ${howMany}`)
}

export function censusSaid(census: Census): readonly string[] {
  const said = [
    `page types under \`${DOMAIN}\`: ${census.kinds}, of them with a page of their own: ${census.byKind.size}`,
    `pages judged: ${census.judged}`,
    `pages no page above them names among its parts: ${census.unnamed.length}`,
  ]
  for (const one of census.unnamed) said.push(`  ${one.shown} — ${one.path}`)
  return said
}
