import {
  everyOfType,
  idsNaming,
  type Listed,
  readingIn,
} from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { kindsUnder } from "../../pages-system/page-types/descent/page-type-descent.module.code.ts"
import { partedIn } from "../../pages-system/pages/file-name/page-file-name.module.code.ts"
import { type Value, valueAt } from "../../pages-system/pages/value/page-value.module.code.ts"

const DOMAIN = "domain"

const PARTS = "part-slugs"

const PART_SLUGS = "partSlugs"

export type DomainRow = {
  readonly slug: string
  readonly path: string
  readonly parent: string | null
  readonly sequence: readonly string[]
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
    drawn.push({
      slug: address,
      path: one.path,
      parent: above.length === 1 ? (above[0]?.parent ?? null) : null,
      sequence: sequenceOf.get(address) ?? [],
    })
  }
  return drawn
}
