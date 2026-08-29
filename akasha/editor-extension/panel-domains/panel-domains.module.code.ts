import { type Value, valueAt } from "../../pages-system/indexes/index-entries.module.code.ts"
import {
  everyOfType,
  idsNaming,
  type Standing,
} from "../../pages-system/indexes/index-reading.module.code.ts"
import { namedIn } from "../../pages-system/page/page-file-name.module.code.ts"
import { kindsUnder } from "../../pages-system/page-type/page-type-descent/page-type-descent.module.code.ts"
import { gather } from "../grouping/grouping.module.code.ts"

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
  const said = namedIn(path)
  return said === null ? null : `${said.tail}/${said.stem}`
}

function partsIn(value: Value | null): readonly string[] {
  if (value === null) return []
  const said = value[PART_SLUGS]
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string")
}

export function kindsUnderDomain(root: string): ReadonlySet<string> {
  return kindsUnder(root, DOMAIN)
}

export function domainsDrawn(root: string): readonly DomainRow[] {
  const standing: Standing[] = []
  for (const kind of [...kindsUnderDomain(root)].sort()) {
    standing.push(...everyOfType(root, kind))
  }
  const addressById = new Map<string, string>()
  for (const one of standing) {
    const address = addressOf(one.path)
    if (address !== null) addressById.set(one.id, address)
  }
  const parentsOf = new Map<string, string[]>()
  const naming = new Set<string>()
  for (const one of standing) {
    const child = addressById.get(one.id)
    if (child === undefined) continue
    for (const above of idsNaming(root, one.id, PARTS)) {
      const parent = addressById.get(above)
      if (parent === undefined) continue
      gather(parentsOf, child, parent)
      naming.add(parent)
    }
  }
  const sequenceOf = new Map<string, readonly string[]>()
  for (const one of standing) {
    const address = addressById.get(one.id)
    if (address === undefined || !naming.has(address)) continue
    sequenceOf.set(address, partsIn(valueAt(one.path, root)))
  }
  const drawn: DomainRow[] = []
  for (const one of standing) {
    const address = addressById.get(one.id)
    if (address === undefined) continue
    const above = parentsOf.get(address) ?? []
    drawn.push({
      slug: address,
      path: one.path,
      parent: above.length === 1 ? (above[0] ?? null) : null,
      sequence: sequenceOf.get(address) ?? [],
    })
  }
  return drawn
}
