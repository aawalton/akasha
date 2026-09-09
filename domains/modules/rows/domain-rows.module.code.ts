import { partedIn } from "../../../pages/file-name/page-file-name.module.code.ts"
import {
  idsNaming,
  readingIn,
  valuesOfType,
} from "../../../pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "../../../pages/indexes/shape/index-shape.module.code.ts"
import { kindsUnder } from "../../../pages/types/descent/page-type-descent.module.code.ts"
import { textAt, type Value, valueAt } from "../../../pages/value/page-value.module.code.ts"

const DOMAIN = "domain"

const PARTS = "parts"

const PERSONA = "persona"

const CHAMPIONED = "championed-domain"

const CHAMPIONS = "championedDomain"

const ID = "id"

export type DomainRow = {
  readonly slug: string
  readonly path: string
  readonly persona: string | null
  readonly parent: string | null
  readonly sequence: readonly string[]
}

type Held = {
  readonly path: string
  readonly id: string
  readonly value: Value
}

function heldOfType(reading: Reading, pageTypeSlug: string): readonly Held[] {
  const found: Held[] = []
  for (const one of valuesOfType(reading, pageTypeSlug)) {
    const id = textAt(one.value, ID)
    if (id !== null) found.push({ path: one.path, id, value: one.value })
  }
  return found
}

function personaSlugById(personas: readonly Held[]): ReadonlyMap<string, string> {
  const byId = new Map<string, string>()
  for (const one of personas) {
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

function partsIn(value: Value): readonly string[] {
  const said = value[PARTS]
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string")
}

export function kindsUnderDomain(root: string): ReadonlySet<string> {
  return kindsUnder(DOMAIN, readingIn(root), (path) => valueAt(path, root))
}

function couldBeChampioned(
  personas: readonly Held[],
  addresses: ReadonlySet<string>
): ReadonlySet<string> {
  const bySlug = new Map<string, string[]>()
  for (const address of addresses) {
    const slug = address.slice(address.indexOf("/") + 1)
    const held = bySlug.get(slug) ?? []
    held.push(address)
    bySlug.set(slug, held)
  }
  const wanted = new Set<string>()
  for (const one of personas) {
    const named = textAt(one.value, CHAMPIONS)
    if (named === null) continue
    if (named.includes("/")) {
      if (addresses.has(named)) wanted.add(named)
      continue
    }
    for (const address of bySlug.get(named) ?? []) wanted.add(address)
  }
  return wanted
}

export function domainsDrawn(root: string): readonly DomainRow[] {
  const reading = readingIn(root)
  const personas = heldOfType(reading, PERSONA)
  const personaBy = personaSlugById(personas)
  const listed: Held[] = []
  for (const kind of [...kindsUnderDomain(root)].sort()) {
    listed.push(...heldOfType(reading, kind))
  }
  const addressById = new Map<string, string>()
  for (const one of listed) {
    const address = addressOf(one.path)
    if (address !== null) addressById.set(one.id, address)
  }
  const addresses = new Set(addressById.values())
  const edges = listed.flatMap((one) => {
    const parent = addressById.get(one.id)
    if (parent === undefined) return []
    return partsIn(one.value)
      .filter((child) => addresses.has(child))
      .map((child) => ({ child, parent }))
  })
  const parentsOf = Map.groupBy(edges, (one) => one.child)
  const naming = new Set(edges.map((one) => one.parent))
  const sequenceOf = new Map<string, readonly string[]>()
  for (const one of listed) {
    const address = addressById.get(one.id)
    if (address === undefined || !naming.has(address)) continue
    sequenceOf.set(address, partsIn(one.value))
  }
  const championed = couldBeChampioned(personas, addresses)
  const drawn: DomainRow[] = []
  for (const one of listed) {
    const address = addressById.get(one.id)
    if (address === undefined) continue
    const above = parentsOf.get(address) ?? []
    const champions = championed.has(address)
      ? [...idsNaming(reading, one.id, CHAMPIONED)]
          .map((id) => personaBy.get(id))
          .filter((slug): slug is string => slug !== undefined)
          .sort()
      : []
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
