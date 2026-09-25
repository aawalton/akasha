import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"

export type PageValue = Readonly<Record<string, unknown>>

export const SET_INFO_AT =
  "temper/addon/pages/items/crafting-sets/modules/sets-set-info/sets-set-info.data-table.code.ts"

export const SET_DATA_AT =
  "temper/addon/pages/items/crafting-sets/modules/sets-set-data/sets-set-data.data-table.code.ts"

export const ITEM_ROWS_AT =
  "temper/web/item-browser/modules/item-browser-rows/item-browser-rows.data-table.code.ts"

const ENUMS = [
  'import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"',
  'import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"',
]

const ROW_TYPE =
  'import type { ItemBrowserRow } from "akasha/temper/web/item-browser/modules/item-browser-types/item-browser-types.module.code.ts"'

const CRAFTED_SET_TYPE = 3

const MYTHIC_SET_TYPE = 12

const JEWELRY_SLOTS: ReadonlySet<string> = new Set(["EQUIP_TYPE_NECK", "EQUIP_TYPE_RING"])

const WEAPON_SLOTS: ReadonlySet<string> = new Set([
  "EQUIP_TYPE_ONE_HAND",
  "EQUIP_TYPE_TWO_HAND",
  "EQUIP_TYPE_OFF_HAND",
])

const MONSTER_SLOTS: readonly string[] = ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"]

const SHIELD = "WEAPONTYPE_SHIELD"

export const ROW_MARKS = {
  crafted: 0x01,
  jewelry: 0x02,
  weapon: 0x04,
  monster: 0x08,
  mixedWeights: 0x10,
  allianceStyle: 0x20,
  multiStyle: 0x40,
  manualStyle: 0x80,
  mythic: 0x100,
  shield: 0x200,
} as const

const KEPT_MARKS: Readonly<Record<string, number>> = {
  "alliance-style": ROW_MARKS.allianceStyle,
  "multi-style": ROW_MARKS.multiStyle,
  "manual-style": ROW_MARKS.manualStyle,
  jewelry: ROW_MARKS.jewelry,
}

const NAMED_LANGUAGES: readonly (readonly [string, string])[] = [
  ["de", "setNameDe"],
  ["es", "setNameEs"],
  ["fr", "setNameFr"],
  ["ru", "setNameRu"],
  ["zh", "setNameZh"],
]

const PLACE_NAMED_LANGUAGES: readonly (readonly [string, string])[] = [
  ["de", "setDropLocationNamesDe"],
  ["en", "setDropLocationNamesEn"],
]

export interface SetPage {
  readonly esoSetId: number
  readonly value: PageValue
}

function numbersOf(held: unknown): readonly number[] {
  return Array.isArray(held) ? held.filter((one): one is number => typeof one === "number") : []
}

function listed(numbers: readonly number[]): string {
  return `[${numbers.join(", ")}]`
}

export function setPagesOf(pages: ReadonlyMap<string, PageValue>): readonly SetPage[] {
  const found: SetPage[] = []
  for (const value of pages.values()) {
    const esoSetId = parseNumber(value.esoSetId)
    if (esoSetId !== undefined) found.push({ esoSetId, value })
  }
  return found.sort((one, other) => one.esoSetId - other.esoSetId)
}

function filed(page: SetPage): boolean {
  return parseNumber(page.value.setTypeId) !== undefined
}

function veteranSaid(value: PageValue): string {
  const slots = stringsIn(value.setVeteranEquipTypes)
  if (slots.length > 0) return `{ ${slots.map((slot) => `[${slot}]: true`).join(", ")} }`
  return value.setVeteran === true ? "true" : "false"
}

function placeNamesSaid(value: PageValue): string | undefined {
  const said = PLACE_NAMED_LANGUAGES.map(
    ([language, key]) => [language, stringsIn(value[key])] as const
  )
    .filter(([, names]) => names.length > 0)
    .map(
      ([language, names]) => `${language}: [${names.map((one) => JSON.stringify(one)).join(", ")}]`
    )
  return said.length === 0 ? undefined : `{ ${said.join(", ")} }`
}

function setInfoEntry(page: SetPage, classIds: ReadonlyMap<string, number>): string {
  const value = page.value
  const fields: string[] = [
    `dlcId: ${String(parseNumber(value.setDlcId) ?? 0)}`,
    `dropMechanic: ${listed(numbersOf(value.setDropMechanics))}`,
  ]
  const placeNames = placeNamesSaid(value)
  if (placeNames !== undefined) fields.push(`dropMechanicDropLocationNames: ${placeNames}`)
  if (value.setProcsAllowedInPvp === true) fields.push("isProcSetAllowedInPvP: 1")
  fields.push(`setType: ${String(parseNumber(value.setTypeId))}`)
  const traits = parseNumber(value.setTraitsNeeded)
  if (traits !== undefined) fields.push(`traitsNeeded: ${String(traits)}`)
  const chest = parseNumber(value.setUndauntedChestId)
  if (chest !== undefined) fields.push(`undauntedChestId: ${String(chest)}`)
  const classId = classIds.get(stringIn(value.classId) ?? "")
  if (classId !== undefined) fields.push(`classId: ${String(classId)}`)
  fields.push(
    `veteran: ${veteranSaid(value)}`,
    `wayshrines: ${listed(numbersOf(value.setWayshrines))}`,
    `zoneIds: ${listed(numbersOf(value.setDropZones))}`
  )
  return `  [${String(page.esoSetId)}]: { ${fields.join(", ")} },`
}

export function setInfoBody(
  pages: readonly SetPage[],
  classIds: ReadonlyMap<string, number>
): string {
  const entries = pages.filter(filed).map((page) => setInfoEntry(page, classIds))
  return [
    ...ENUMS,
    "",
    "export const SET_INFO: Record<number, Record<string, unknown>> = {",
    ...entries,
    "}",
    "",
  ].join("\n")
}

function namesSaid(page: SetPage): string {
  const named: (readonly [string, string])[] = [["en", stringIn(page.value.title) ?? ""]]
  for (const [language, key] of NAMED_LANGUAGES) {
    const name = stringIn(page.value[key])
    if (name !== null) named.push([language, name])
  }
  const said = named
    .sort(([one], [other]) => one.localeCompare(other))
    .map(([language, name]) => `${language}: ${JSON.stringify(name)}`)
  return `[${String(page.esoSetId)}]: { ${said.join(", ")} },`
}

function bySetSaid(key: string, entries: readonly string[]): readonly string[] {
  return [`  ${key}: {`, ...entries.map((one) => `    ${one}`), "  },"]
}

function setsByConstant(pages: readonly SetPage[], key: string): readonly string[] {
  const held = new Map<string, number[]>()
  for (const page of pages) {
    for (const constant of stringsIn(page.value[key])) {
      const ids = held.get(constant) ?? []
      ids.push(page.esoSetId)
      held.set(constant, ids)
    }
  }
  return [...held.keys()].sort().map((constant) => {
    const ids = held.get(constant) ?? []
    return `[${constant}]: { ${ids.map((id) => `[${String(id)}]: 1`).join(", ")} },`
  })
}

export function setDataBody(pages: readonly SetPage[]): string {
  const sets = pages.filter(filed)
  const itemIds = sets
    .filter((page) => numbersOf(page.value.esoItemIds).length > 0)
    .map((page) => `[${String(page.esoSetId)}]: ${listed(numbersOf(page.value.esoItemIds))},`)
  const jewelry = sets
    .filter((page) => stringsIn(page.value.esoEquipTypes).some((slot) => JEWELRY_SLOTS.has(slot)))
    .map((page) => `[${String(page.esoSetId)}]: 1,`)
  return [
    ...ENUMS,
    "",
    "export const SET_DATA: Record<string, unknown> = {",
    ...bySetSaid("setItemIds", itemIds),
    "  setItemIdsNoSetId: [],",
    ...bySetSaid("setNames", sets.map(namesSaid)),
    "  setNamesNoSetId: [],",
    ...bySetSaid("setsArmorTypes", setsByConstant(sets, "esoArmorTypes")),
    ...bySetSaid("setsEquipTypes", setsByConstant(sets, "esoEquipTypes")),
    ...bySetSaid("setsWeaponTypes", setsByConstant(sets, "esoWeaponTypes")),
    ...bySetSaid("setsWithJewelry", jewelry),
    "}",
    "",
  ].join("\n")
}

export type Source = number | readonly number[]

export function sourcesIn(said: readonly string[]): readonly Source[] | undefined {
  const found: Source[] = []
  for (const one of said) {
    const [place, narrower] = one.split(":")
    const zone = Number(place)
    if (place === undefined || place === "" || !Number.isInteger(zone)) return undefined
    found.push(zone)
    if (narrower === undefined) continue
    const zones = narrower.split(",").map(Number)
    if (!zones.every(Number.isInteger)) return undefined
    found.push(zones)
  }
  return found
}

export function sourcesSaid(sources: readonly Source[]): readonly string[] | undefined {
  const said: string[] = []
  for (const source of sources) {
    if (typeof source === "number") {
      said.push(String(source))
      continue
    }
    const last = said.pop()
    if (last === undefined || last.includes(":")) return undefined
    said.push(`${last}:${source.join(",")}`)
  }
  return said
}

function allIn(held: readonly string[], within: ReadonlySet<string>): boolean {
  return held.length > 0 && held.every((one) => within.has(one))
}

export function rowMarksOf(value: PageValue): number {
  const setType = parseNumber(value.setTypeId)
  const slots = stringsIn(value.esoEquipTypes)
  const weapons = stringsIn(value.esoWeaponTypes)
  const weapon = allIn(slots, WEAPON_SLOTS)
  let marks = 0
  if (setType === CRAFTED_SET_TYPE) marks |= ROW_MARKS.crafted
  if (allIn(slots, JEWELRY_SLOTS)) marks |= ROW_MARKS.jewelry
  if (weapon) marks |= ROW_MARKS.weapon
  if (slots.length === MONSTER_SLOTS.length && MONSTER_SLOTS.every((one) => slots.includes(one))) {
    marks |= ROW_MARKS.monster
  }
  if (stringsIn(value.esoArmorTypes).length > 1) marks |= ROW_MARKS.mixedWeights
  if (setType === MYTHIC_SET_TYPE) marks |= ROW_MARKS.mythic
  if (weapon && weapons.includes(SHIELD)) marks |= ROW_MARKS.shield
  for (const kind of stringsIn(value.itemBrowserKinds)) marks |= KEPT_MARKS[kind] ?? 0
  return marks
}

function rowSaid(page: SetPage, id: number): string | undefined {
  const value = page.value
  const sources = sourcesIn(stringsIn(value.itemBrowserSources))
  if (sources === undefined) return undefined
  const marks = rowMarksOf(value)
  const fields = [
    `id: ${String(id)}`,
    `flags: ${String(marks)}`,
    `sources: ${JSON.stringify(sources).replaceAll(",", ", ")}`,
    `places: ${listed(numbersOf(value.itemBrowserPlaceKinds))}`,
  ]
  const ext =
    (marks & ROW_MARKS.crafted) !== 0
      ? parseNumber(value.setTraitsNeeded)
      : parseNumber(value.itemBrowserStyle)
  if (ext !== undefined) fields.push(`ext: ${String(ext)}`)
  const subname = stringIn(value.itemBrowserSubname)
  if (subname !== null) fields.push(`alt: ${JSON.stringify(subname)}`)
  return `  { ${fields.join(", ")} },`
}

export function itemRowsBody(pages: readonly SetPage[]): string {
  const rows: string[] = []
  for (const page of pages) {
    const id = parseNumber(page.value.itemBrowserItemId)
    if (id === undefined) continue
    const said = rowSaid(page, id)
    if (said !== undefined) rows.push(said)
  }
  return [
    ROW_TYPE,
    "",
    "export const ITEM_BROWSER_ROWS: readonly ItemBrowserRow[] = [",
    ...rows,
    "]",
    "",
  ].join("\n")
}
