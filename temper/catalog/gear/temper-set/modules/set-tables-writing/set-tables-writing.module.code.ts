import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"

export type PageValue = Readonly<Record<string, unknown>>

export const SET_INFO_AT =
  "temper/addon/pages/items/crafting-sets/modules/sets-set-info/sets-set-info.data-table.code.ts"

export const SET_DATA_AT =
  "temper/addon/pages/items/crafting-sets/modules/sets-set-data/sets-set-data.data-table.code.ts"

const ENUMS = [
  'import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"',
  'import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"',
]

const JEWELRY_SLOTS: ReadonlySet<string> = new Set(["EQUIP_TYPE_NECK", "EQUIP_TYPE_RING"])

const DUNGEON_KINDS: ReadonlySet<number> = new Set([3, 4, 5])

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

interface SetPage {
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

export function placeKindsOf(zones: Iterable<PageValue>): ReadonlyMap<number, number> {
  const found = new Map<number, number>()
  for (const zone of zones) {
    const id = parseNumber(zone.esoZoneId)
    const kind = parseNumber(zone.itemBrowserPlaceKind)
    if (id !== undefined && kind !== undefined) found.set(id, kind)
  }
  return found
}

function zonesSaid(zones: readonly number[]): readonly string[] {
  return [...new Set(zones)]
    .sort((one, other) => one - other)
    .map((zone) => `[${String(zone)}]: true,`)
}

export function setDataBody(
  pages: readonly SetPage[],
  publicDungeons: readonly number[],
  placeKinds: ReadonlyMap<number, number>
): string {
  const sets = pages.filter(filed)
  const dungeons = [...placeKinds]
    .filter(([zone, kind]) => zone > 0 && DUNGEON_KINDS.has(kind))
    .map(([zone]) => zone)
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
    ...bySetSaid("dungeonZoneIds", zonesSaid(dungeons)),
    ...bySetSaid("publicDungeonZoneIds", zonesSaid(publicDungeons)),
    "}",
    "",
  ].join("\n")
}
