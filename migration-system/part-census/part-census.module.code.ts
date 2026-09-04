import { everyOfType } from "@akasha/indexes"
import { namedUnder } from "@akasha/pages-system/page-file-name"
import { shadowAt } from "@akasha/pages-system/shadow"

const DOMAIN = "domain"

const THE_WHOLE = "akasha"

const PART_SLUGS = "part-slugs"

const PARTED_BY = "/"

const ONE = 1

const WHOLE_ADDRESS = `${DOMAIN}${PARTED_BY}${THE_WHOLE}`

export type Filed = {
  readonly id: string
  readonly path: string
}

export type Unnamed = {
  readonly path: string
  readonly shown: string
}

export type Shared = {
  readonly path: string
  readonly shown: string
  readonly namedBy: readonly string[]
}

export type Naming = {
  readonly kinds: ReadonlySet<string>
  readonly pagesOf: (kind: string) => readonly Filed[]
  readonly addressOf: (path: string) => string | null
  readonly shownOf: (path: string) => string | null
  readonly namersOf: (id: string) => readonly string[]
}

export type Climb = "rooted" | "orphaned" | "looping"

export type Census = {
  readonly kinds: number
  readonly judged: number
  readonly unnamed: readonly Unnamed[]
  readonly shared: readonly Shared[]
  readonly looping: readonly Unnamed[]
  readonly byKind: ReadonlyMap<string, number>
}

export function namingAt(root: string): Naming {
  const shadow = shadowAt(root)
  const under = shadow.index.kindsUnder(DOMAIN)
  const addressOf = (path: string): string | null => {
    const held = namedUnder(path, under)
    if (held === null) return null
    return `${held.pageTypeSlug}${PARTED_BY}${held.slug}`
  }
  return {
    kinds: under,
    pagesOf: (kind) => everyOfType(root, kind).map((one) => ({ id: one.id, path: one.path })),
    addressOf,
    shownOf: (path) => {
      const said = addressOf(path)
      return said === WHOLE_ADDRESS ? null : said
    },
    namersOf: (id) => shadow.index.idsNaming(id, PART_SLUGS),
  }
}

function byShown(one: Unnamed | Shared, two: Unnamed | Shared): number {
  if (one.shown < two.shown) return -1
  return one.shown > two.shown ? ONE : 0
}

function namerShown(naming: Naming, pathById: ReadonlyMap<string, string>, id: string): string {
  const at = pathById.get(id)
  if (at === undefined) return id
  return naming.addressOf(at) ?? at
}

function climbFrom(
  naming: Naming,
  wholeId: string,
  settled: Map<string, Climb>,
  from: string
): Climb {
  const climbing: string[] = []
  const seen = new Set<string>()
  let at = from
  let ended: Climb = "looping"
  for (;;) {
    if (at === wholeId) {
      ended = "rooted"
      break
    }
    const known = settled.get(at)
    if (known !== undefined) {
      ended = known
      break
    }
    if (seen.has(at)) break
    seen.add(at)
    climbing.push(at)
    const above = naming.namersOf(at)[0]
    if (above === undefined) {
      ended = "orphaned"
      break
    }
    at = above
  }
  for (const one of climbing) settled.set(one, ended)
  return ended
}

export function censusIn(naming: Naming): Census {
  const unnamed: Unnamed[] = []
  const shared: Shared[] = []
  const looping: Unnamed[] = []
  const byKind = new Map<string, number>()
  const pathById = new Map<string, string>()
  const judging: Filed[] = []
  let wholeId: string | null = null
  for (const kind of naming.kinds) {
    for (const one of naming.pagesOf(kind)) {
      pathById.set(one.id, one.path)
      if (naming.shownOf(one.path) === null) {
        if (naming.addressOf(one.path) !== null) wholeId = one.id
        continue
      }
      byKind.set(kind, (byKind.get(kind) ?? 0) + ONE)
      judging.push(one)
    }
  }
  for (const one of judging) {
    const shown = naming.shownOf(one.path)
    if (shown === null) continue
    const namers = naming.namersOf(one.id)
    if (namers.length === 0) {
      unnamed.push({ path: one.path, shown })
      continue
    }
    if (namers.length === ONE) continue
    const namedBy = namers.map((id) => namerShown(naming, pathById, id)).sort()
    shared.push({ path: one.path, shown, namedBy })
  }
  const settled = new Map<string, Climb>()
  if (wholeId !== null) {
    for (const one of judging) {
      const shown = naming.shownOf(one.path)
      if (shown === null) continue
      if (climbFrom(naming, wholeId, settled, one.id) !== "looping") continue
      looping.push({ path: one.path, shown })
    }
  }
  unnamed.sort(byShown)
  shared.sort(byShown)
  looping.sort(byShown)
  return { kinds: naming.kinds.size, judged: judging.length, unnamed, shared, looping, byKind }
}

export function censusOver(root: string): Census {
  return censusIn(namingAt(root))
}

export function faultedIn(census: Census): boolean {
  return census.unnamed.length > 0 || census.shared.length > 0 || census.looping.length > 0
}

export function pathsIn(census: Census): readonly string[] {
  return [...census.unnamed, ...census.shared, ...census.looping].map((one) => one.path)
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
  said.push(`pages more than one page names among its parts: ${census.shared.length}`)
  for (const one of census.shared) said.push(`  ${one.shown} — ${one.namedBy.join(", ")}`)
  said.push(
    `pages whose parents loop rather than reaching \`${WHOLE_ADDRESS}\`: ${census.looping.length}`
  )
  for (const one of census.looping) said.push(`  ${one.shown} — ${one.path}`)
  return said
}
