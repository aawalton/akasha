import { addPropertyToPages } from "akasha/change/mechanical/file-content/add/add-property-to-pages/add-property-to-pages.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { removePropertyFromEveryPage } from "akasha/change/mechanical/page-type/remove/remove-property-from-every-page/remove-property-from-every-page.change-mechanical-page-type.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import {
  type PageValue,
  rowMarksOf,
  type Source,
  sourcesSaid,
} from "akasha/temper/catalog/gear/temper-set/modules/set-tables-writing/set-tables-writing.module.code.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"

const PUT = `${changeMechanicalFileContent.slug}/${addPropertyToPages.slug}` as const

const TAKE_OFF = `${changeMechanicalPageType.slug}/${removePropertyFromEveryPage.slug}` as const

const PLACED_AFTER = "esoSetId"

const CRAFTED_MARK = 0x01

const JEWELRY_MARK = 0x02

const MANUAL_STYLE_MARK = 0x80

const KEPT_MARKS: readonly (readonly [number, string])[] = [
  [0x20, "alliance-style"],
  [0x40, "multi-style"],
  [MANUAL_STYLE_MARK, "manual-style"],
]

const LANGUAGES: readonly (readonly [string, string])[] = [
  ["de", "setNameDe"],
  ["es", "setNameEs"],
  ["fr", "setNameFr"],
  ["ru", "setNameRu"],
  ["zh", "setNameZh"],
]

export interface Row {
  readonly id: number
  readonly flags: number
  readonly sources: readonly Source[]
  readonly ext?: number
  readonly alt?: string
}

export interface Names {
  readonly armor: ReadonlyMap<number, string>
  readonly equip: ReadonlyMap<number, string>
  readonly weapon: ReadonlyMap<number, string>
}

export interface Upstream {
  readonly setInfo: Readonly<Record<number, Readonly<Record<string, unknown>>>>
  readonly setData: Readonly<Record<string, unknown>>
  readonly rows: readonly Row[]
  readonly placeKinds: Readonly<Record<number, number | undefined>>
  readonly names: Names
}

export interface CarriedOver {
  readonly askings: readonly Asking[]
  readonly faults: readonly string[]
  readonly rowsUnpaged: readonly number[]
}

function itemIdsIn(held: unknown): readonly number[] {
  if (!Array.isArray(held)) return []
  const found: number[] = []
  for (const one of held) {
    if (typeof one === "number") {
      found.push(one)
      continue
    }
    if (typeof one !== "string") continue
    const [first, more] = one.split(",").map(Number)
    if (first === undefined || more === undefined) continue
    for (let at = 0; at <= more; at++) found.push(first + at)
  }
  return [...new Set(found)].sort((one, other) => one - other)
}

function typesOfSet(
  table: unknown,
  esoSetId: number,
  names: ReadonlyMap<number, string>
): readonly string[] {
  if (!isRecord(table) && !Array.isArray(table)) return []
  const held: Readonly<Record<string, unknown>> = { ...table }
  const found: string[] = []
  for (const key of Object.keys(held)) {
    const sets = held[key]
    const name = names.get(Array.isArray(table) ? Number(key) + 1 : Number(key))
    if (name !== undefined && isRecord(sets) && sets[esoSetId] === 1) found.push(name)
  }
  return found.sort()
}

function trimmed(names: readonly unknown[]): readonly string[] {
  const found = names.filter((one): one is string => typeof one === "string")
  let end = found.length
  while (end > 0 && found[end - 1] === "") end--
  return found.slice(0, end)
}

function veteranFacts(veteran: unknown, names: Names): PageValue {
  if (veteran === true) return { setVeteran: true }
  if (!isRecord(veteran)) return {}
  const slots = Object.keys(veteran)
    .filter((key) => veteran[key] === true)
    .map((key) => names.equip.get(Number(key)))
    .filter((one): one is string => one !== undefined)
  return slots.length > 0 ? { setVeteranEquipTypes: slots.sort() } : {}
}

function setFacts(info: Readonly<Record<string, unknown>>, names: Names): PageValue {
  const facts: Record<string, unknown> = {
    setTypeId: info.setType,
    setDropMechanics: info.dropMechanic,
    setDlcId: info.dlcId,
    setWayshrines: info.wayshrines,
    setDropZones: info.zoneIds,
    ...veteranFacts(info.veteran, names),
  }
  if (info.isProcSetAllowedInPvP === 1) facts.setProcsAllowedInPvp = true
  if (typeof info.traitsNeeded === "number") facts.setTraitsNeeded = info.traitsNeeded
  if (typeof info.undauntedChestId === "number") facts.setUndauntedChestId = info.undauntedChestId
  const placeNames = info.dropMechanicDropLocationNames
  if (isRecord(placeNames)) {
    const en = Array.isArray(placeNames.en) ? trimmed(placeNames.en) : []
    const de = Array.isArray(placeNames.de) ? trimmed(placeNames.de) : []
    if (en.length > 0) facts.setDropLocationNamesEn = en
    if (de.length > 0) facts.setDropLocationNamesDe = de
  }
  return facts
}

function namedFacts(named: unknown): PageValue {
  if (!isRecord(named)) return {}
  const facts: Record<string, unknown> = {}
  for (const [language, key] of LANGUAGES) {
    const name = named[language]
    if (typeof name === "string" && name !== "") facts[key] = name
  }
  return facts
}

function pieceFacts(upstream: Upstream, esoSetId: number): PageValue {
  const data = upstream.setData
  const ids = itemIdsIn(isRecord(data.setItemIds) ? data.setItemIds[esoSetId] : undefined)
  if (ids.length === 0) return {}
  const facts: Record<string, unknown> = { esoItemIds: ids }
  const armor = typesOfSet(data.setsArmorTypes, esoSetId, upstream.names.armor)
  const equip = typesOfSet(data.setsEquipTypes, esoSetId, upstream.names.equip)
  const weapon = typesOfSet(data.setsWeaponTypes, esoSetId, upstream.names.weapon)
  if (armor.length > 0) facts.esoArmorTypes = armor
  if (equip.length > 0) facts.esoEquipTypes = equip
  if (weapon.length > 0) facts.esoWeaponTypes = weapon
  return facts
}

function placesOf(row: Row, upstream: Upstream): readonly number[] | undefined {
  const places: number[] = []
  for (const source of row.sources) {
    if (typeof source !== "number") continue
    const kind = upstream.placeKinds[source]
    if (kind === undefined) return undefined
    places.push(kind)
  }
  return places
}

function rowFacts(row: Row, upstream: Upstream, before: PageValue): PageValue | string {
  const sources = sourcesSaid(row.sources)
  if (sources === undefined) return `row ${String(row.id)} holds places that cannot be written`
  const kinds = KEPT_MARKS.filter(([mark]) => (row.flags & mark) !== 0).map(([, kind]) => kind)
  const derived = rowMarksOf({ ...before, itemBrowserKinds: undefined })
  if ((row.flags & JEWELRY_MARK) !== 0 && (derived & JEWELRY_MARK) === 0) {
    kinds.push("jewelry")
  }
  const facts: Record<string, unknown> = { itemBrowserItemId: row.id, itemBrowserSources: sources }
  if (kinds.length > 0) facts.itemBrowserKinds = kinds.sort()
  const places = placesOf(row, upstream)
  if (places === undefined) return `row ${String(row.id)} drops in a place of no kind`
  if (places.length > 0) facts.itemBrowserPlaceKinds = places
  if (row.alt !== undefined) facts.itemBrowserSubname = row.alt
  if ((row.flags & MANUAL_STYLE_MARK) !== 0 && row.ext !== undefined) {
    facts.itemBrowserStyle = row.ext
  }
  const after = { ...before, ...facts }
  const marks = rowMarksOf(after)
  if (marks !== row.flags) {
    return `row ${String(row.id)} is marked ${String(row.flags)} and its page works out ${String(marks)}`
  }
  if ((row.flags & CRAFTED_MARK) !== 0 && row.ext !== parseNumber(after.setTraitsNeeded)) {
    return `row ${String(row.id)} needs ${String(row.ext)} traits and its page says otherwise`
  }
  return facts
}

function setOfEachItem(setData: Readonly<Record<string, unknown>>): ReadonlyMap<number, number> {
  const found = new Map<number, number>()
  const itemIds = setData.setItemIds
  if (!isRecord(itemIds)) return found
  for (const key of Object.keys(itemIds)) {
    for (const id of itemIdsIn(itemIds[key])) found.set(id, Number(key))
  }
  return found
}

function askingsFor(
  added: ReadonlyMap<string, Readonly<Record<string, unknown>>>,
  pages: ReadonlyMap<string, PageValue>
): Asking[] {
  const keys = new Set<string>()
  for (const facts of added.values()) for (const key of Object.keys(facts)) keys.add(key)
  const askings: Asking[] = []
  for (const key of [...keys].sort()) {
    const said = (path: string): string | undefined => {
      const carried = added.get(path)?.[key]
      const held = carried ?? pages.get(path)?.[key]
      return held === undefined ? undefined : JSON.stringify(held)
    }
    const differs = [...added.keys()].some(
      (path) => said(path) !== JSON.stringify(pages.get(path)?.[key] ?? null)
    )
    if (!differs) continue
    const stated = [...pages.values()].some((value) => value[key] !== undefined)
    if (stated) askings.push({ at: TAKE_OFF, given: { pageType: temperSet.slug, key } })
    const valued = [...pages.keys()]
      .map((path) => ({ path, value: said(path) }))
      .filter((one): one is { path: string; value: string } => one.value !== undefined)
      .filter((one) => stated || added.get(one.path)?.[key] !== undefined)
      .sort((one, other) => one.path.localeCompare(other.path))
    askings.push({ at: PUT, given: { key, valued, after: PLACED_AFTER } })
  }
  return askings
}

export function carriedOver(
  pages: ReadonlyMap<string, PageValue>,
  upstream: Upstream
): CarriedOver {
  const byId = new Map<number, { readonly path: string; readonly value: PageValue }>()
  for (const [path, value] of pages) {
    const esoSetId = parseNumber(value.esoSetId)
    if (esoSetId !== undefined) byId.set(esoSetId, { path, value })
  }
  const names = isRecord(upstream.setData.setNames) ? upstream.setData.setNames : {}
  const added = new Map<string, Record<string, unknown>>()
  for (const [esoSetId, page] of byId) {
    const info = upstream.setInfo[esoSetId]
    added.set(page.path, {
      ...(info === undefined ? {} : setFacts(info, upstream.names)),
      ...namedFacts(names[esoSetId]),
      ...(page.value.esoItemIds === undefined ? pieceFacts(upstream, esoSetId) : {}),
    })
  }
  const setOfItem = setOfEachItem(upstream.setData)
  const faults: string[] = []
  const rowsUnpaged: number[] = []
  for (const row of upstream.rows) {
    const esoSetId = setOfItem.get(row.id)
    const page = esoSetId === undefined ? undefined : byId.get(esoSetId)
    if (page === undefined) {
      rowsUnpaged.push(esoSetId ?? row.id)
      continue
    }
    const facts = rowFacts(row, upstream, { ...page.value, ...added.get(page.path) })
    if (typeof facts === "string") faults.push(facts)
    else added.set(page.path, { ...added.get(page.path), ...facts })
  }
  return {
    askings: askingsFor(added, pages),
    faults,
    rowsUnpaged: rowsUnpaged.sort((one, other) => one - other),
  }
}
