import { type Value, valueAt } from "../../pages-system/index/index-entries.module.code.ts"
import {
  type Standing,
  everyOfType,
  idsNaming,
} from "../../pages-system/index/index-reading.module.code.ts"
import { namedIn } from "../../pages-system/page/page-file-name.module.code.ts"

const PAGE_TYPE = "page-type"

const DOMAIN = "domain"

const PARTS = "part-slugs"

const EXTENDS = "extendsSlug"

const PART_SLUGS = "partSlugs"

const SLUG = "slug"

export type DomainRow = {
  readonly slug: string
  readonly path: string
  readonly parent: string | null
  readonly sequence: readonly string[]
}

function slugOf(address: string): string {
  const at = address.indexOf("/")
  return at === -1 ? address : address.slice(at + 1)
}

function addressOf(path: string): string | null {
  const said = namedIn(path)
  return said === null ? null : `${said.tail}/${said.stem}`
}

function held(into: Map<string, string[]>, key: string, value: string): void {
  const at = into.get(key)
  if (at === undefined) into.set(key, [value])
  else at.push(value)
}

function partsIn(value: Value | null): readonly string[] {
  if (value === null) return []
  const said = value[PART_SLUGS]
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string")
}

export function kindsUnderDomain(root: string): ReadonlySet<string> {
  const above = new Map<string, string>()
  for (const one of everyOfType(root, PAGE_TYPE)) {
    const value = valueAt(one.path, root)
    if (value === null) continue
    const slug = value[SLUG]
    const said = value[EXTENDS]
    if (typeof slug === "string" && typeof said === "string") above.set(slug, slugOf(said))
  }
  const under = new Set<string>([DOMAIN])
  for (;;) {
    let grew = false
    for (const [slug, parent] of above) {
      if (!under.has(slug) && under.has(parent)) {
        under.add(slug)
        grew = true
      }
    }
    if (!grew) return under
  }
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
      held(parentsOf, child, parent)
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
