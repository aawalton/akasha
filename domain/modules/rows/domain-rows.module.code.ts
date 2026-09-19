import type { DomainRow as PanelRow } from "akasha/code/editor/extension/modules/champions-tree/champions-tree.module.code.ts"
import {
  readingIn,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { idsNaming } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"

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

export type Filed = {
  readonly path: string
  readonly id: string
  readonly parts: readonly string[]
  readonly champions: string | null
  readonly drawn: boolean
}

export function filedOf(path: string, value: Value, drawn: boolean): Filed | null {
  const id = textAt(value, ID)
  if (id === null) return null
  return { path, id, parts: partsIn(value), champions: textAt(value, CHAMPIONS), drawn }
}

export function filedIn(given: string | Reading): readonly Filed[] {
  const reading = readingIn(given)
  const found = new Map<string, Filed>()
  for (const one of valuesOfType(reading, PERSONA)) {
    const made = filedOf(one.path, one.value, false)
    if (made !== null) found.set(one.path, made)
  }
  for (const kind of [...kindsUnderDomain(reading)].sort()) {
    for (const one of valuesOfType(reading, kind)) {
      const made = filedOf(one.path, one.value, true)
      if (made !== null) found.set(one.path, made)
    }
  }
  return [...found.values()]
}

function personasIn(filed: readonly Filed[]): readonly Filed[] {
  return filed.filter((one) => partedIn(one.path)?.pageType === PERSONA)
}

function personaSlugById(personas: readonly Filed[]): ReadonlyMap<string, string> {
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

export function kindsUnderDomain(given: string | Reading): ReadonlySet<string> {
  return kindsUnder(DOMAIN, readingIn(given))
}

function couldBeChampioned(
  personas: readonly Filed[],
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
    const named = one.champions
    if (named === null) continue
    if (named.includes("/")) {
      if (addresses.has(named)) wanted.add(named)
      continue
    }
    for (const address of bySlug.get(named) ?? []) wanted.add(address)
  }
  return wanted
}

export function domainsFrom(filed: readonly Filed[], reading: Reading): readonly DomainRow[] {
  const personas = personasIn(filed)
  const personaBy = personaSlugById(personas)
  const listed = filed.filter((one) => one.drawn)
  const addressById = new Map<string, string>()
  for (const one of listed) {
    const address = addressOf(one.path)
    if (address !== null) addressById.set(one.id, address)
  }
  const addresses = new Set(addressById.values())
  const edges = listed.flatMap((one) => {
    const parent = addressById.get(one.id)
    if (parent === undefined) return []
    return one.parts.filter((child) => addresses.has(child)).map((child) => ({ child, parent }))
  })
  const parentsOf = Map.groupBy(edges, (one) => one.child)
  const naming = new Set(edges.map((one) => one.parent))
  const sequenceOf = new Map<string, readonly string[]>()
  for (const one of listed) {
    const address = addressById.get(one.id)
    if (address === undefined || !naming.has(address)) continue
    sequenceOf.set(address, one.parts)
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

export function domainsDrawn(given: string | Reading): readonly DomainRow[] {
  const reading = readingIn(given)
  return domainsFrom(filedIn(reading), reading)
}

export function rowsFrom(drawn: readonly DomainRow[]): readonly PanelRow[] {
  return drawn.map((one) => ({
    slug: one.slug,
    relPath: one.path,
    persona: one.persona,
    parent: one.parent,
    sequence: one.sequence,
  }))
}

export function domainRowsIn(given: string | Reading): readonly PanelRow[] {
  return rowsFrom(domainsDrawn(given))
}
