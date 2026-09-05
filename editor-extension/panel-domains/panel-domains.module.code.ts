import { partedIn } from "../../pages/file-name/page-file-name.module.code.ts"
import {
  everyOfType,
  idsNaming,
  type Listed,
  readingIn,
} from "../../pages/indexes/reading/index-reading.module.code.ts"
import { kindsUnder } from "../../pages/types/descent/page-type-descent.module.code.ts"
import { type Value, valueAt } from "../../pages/value/page-value.module.code.ts"

const DOMAIN = "domain"

const PARTS = "part-slugs"

const PART_SLUGS = "partSlugs"

const PERSONA = "persona"

const CHAMPIONED = "championed-domain-slug"

export type DomainRow = {
  readonly slug: string
  readonly path: string
  readonly persona: string | null
  readonly parent: string | null
  readonly sequence: readonly string[]
}

// EVERY PERSONA BY THE ID THE INDEX KNOWS HER BY. A persona names the domain she champions, so the
// edge runs from her to it; this is the half needed to read that edge backwards, from a domain to
// whoever answers for it. Her slug is taken off her file name rather than out of her page, which
// keeps this to the index and opens no body.
function personaSlugById(root: string): ReadonlyMap<string, string> {
  const byId = new Map<string, string>()
  for (const one of everyOfType(root, PERSONA)) {
    const said = partedIn(one.path)
    if (said === null) continue
    byId.set(one.id, said.slug)
  }
  return byId
}

function addressOf(path: string): string | null {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return null
  return `${said.pageType}/${said.slug}`
}

function partsIn(value: Value | null): readonly string[] {
  if (value === null) return []
  const said = value[PART_SLUGS]
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string")
}

export function kindsUnderDomain(root: string): ReadonlySet<string> {
  return kindsUnder(DOMAIN, readingIn(root), (path) => valueAt(path, root))
}

export function domainsDrawn(root: string): readonly DomainRow[] {
  const personaBy = personaSlugById(root)
  const listed: Listed[] = []
  for (const kind of [...kindsUnderDomain(root)].sort()) {
    listed.push(...everyOfType(root, kind))
  }
  const addressById = new Map<string, string>()
  for (const one of listed) {
    const address = addressOf(one.path)
    if (address !== null) addressById.set(one.id, address)
  }
  const edges = listed.flatMap((one) => {
    const child = addressById.get(one.id)
    if (child === undefined) return []
    return [...idsNaming(root, one.id, PARTS)].flatMap((above) => {
      const parent = addressById.get(above)
      return parent === undefined ? [] : [{ child, parent }]
    })
  })
  const parentsOf = Map.groupBy(edges, (one) => one.child)
  const naming = new Set(edges.map((one) => one.parent))
  const sequenceOf = new Map<string, readonly string[]>()
  for (const one of listed) {
    const address = addressById.get(one.id)
    if (address === undefined || !naming.has(address)) continue
    sequenceOf.set(address, partsIn(valueAt(one.path, root)))
  }
  const drawn: DomainRow[] = []
  for (const one of listed) {
    const address = addressById.get(one.id)
    if (address === undefined) continue
    const above = parentsOf.get(address) ?? []
    // A DOMAIN TWO PERSONAS CHAMPION NAMES THE FIRST BY NAME, so which one is drawn does not turn
    // on what order the index answered in.
    const champions = [...idsNaming(root, one.id, CHAMPIONED)]
      .map((id) => personaBy.get(id))
      .filter((slug): slug is string => slug !== undefined)
      .sort()
    drawn.push({
      slug: address,
      path: one.path,
      persona: champions[0] ?? null,
      parent: above.length === 1 ? (above[0]?.parent ?? null) : null,
      sequence: sequenceOf.get(address) ?? [],
    })
  }
  return drawn
}
