import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"
import { temperPublicDungeon } from "akasha/temper/catalog/world/temper-public-dungeon/temper-public-dungeon.page-type.ts"
import type { TemperPublicDungeon } from "akasha/temper/catalog/world/temper-public-dungeon/temper-public-dungeon.page-type.types.ts"
import { temperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.ts"
import type { TemperWorldZone } from "akasha/temper/catalog/world/zone/temper-world-zone.page-type.types.ts"

type DataSet = Pick<
  TemperSet,
  | "esoSetId"
  | "title"
  | "setTypeId"
  | "esoItemIds"
  | "esoArmorTypes"
  | "esoEquipTypes"
  | "esoWeaponTypes"
  | "setNameDe"
  | "setNameEs"
  | "setNameFr"
  | "setNameRu"
  | "setNameZh"
>

type BySet = { [setId: number]: number }

type ByConstant = { [constant: number]: BySet }

type Zones = { [zone: number]: boolean }

const JEWELRY_SLOTS: readonly string[] = ["EQUIP_TYPE_NECK", "EQUIP_TYPE_RING"]

const DUNGEON_KINDS: readonly number[] = [3, 4, 5]

function file(this: void, into: ByConstant, names: readonly string[] | undefined, setId: number) {
  for (const name of names ?? []) {
    const constant = _G[name]
    if (typeof constant !== "number") continue
    const sets = into[constant] ?? {}
    sets[setId] = 1
    into[constant] = sets
  }
}

function namesOf(this: void, set: DataSet): { [language: string]: string | undefined } {
  return {
    de: set.setNameDe,
    en: set.title ?? "",
    es: set.setNameEs,
    fr: set.setNameFr,
    ru: set.setNameRu,
    zh: set.setNameZh,
  }
}

function dungeonsOf(this: void): Zones {
  const found: Zones = {}
  for (const zone of $pagesOfType<Pick<TemperWorldZone, "esoZoneId" | "itemBrowserPlaceKind">>(
    temperWorldZone
  )) {
    const kind = zone.itemBrowserPlaceKind
    if (zone.esoZoneId === undefined || zone.esoZoneId <= 0 || kind === undefined) continue
    if (DUNGEON_KINDS.includes(kind)) found[zone.esoZoneId] = true
  }
  return found
}

function publicDungeonsOf(this: void): Zones {
  const found: Zones = {}
  for (const one of $pagesOfType<Pick<TemperPublicDungeon, "esoZoneId">>(temperPublicDungeon)) {
    found[one.esoZoneId] = true
  }
  return found
}

function setDataOf(this: void): Record<string, unknown> {
  const setItemIds: { [setId: number]: readonly number[] } = {}
  const setNames: { [setId: number]: { [language: string]: string | undefined } } = {}
  const setsArmorTypes: ByConstant = {}
  const setsEquipTypes: ByConstant = {}
  const setsWeaponTypes: ByConstant = {}
  const setsWithJewelry: BySet = {}
  for (const set of $pagesOfType<DataSet>(temperSet)) {
    if (set.setTypeId === undefined) continue
    const id = set.esoSetId
    const itemIds = set.esoItemIds ?? []
    if (itemIds.length > 0) setItemIds[id] = itemIds
    setNames[id] = namesOf(set)
    file(setsArmorTypes, set.esoArmorTypes, id)
    file(setsEquipTypes, set.esoEquipTypes, id)
    file(setsWeaponTypes, set.esoWeaponTypes, id)
    if ((set.esoEquipTypes ?? []).some((slot) => JEWELRY_SLOTS.includes(slot))) {
      setsWithJewelry[id] = 1
    }
  }
  return {
    setItemIds,
    setItemIdsNoSetId: [],
    setNames,
    setNamesNoSetId: [],
    setsArmorTypes,
    setsEquipTypes,
    setsWeaponTypes,
    setsWithJewelry,
    dungeonZoneIds: dungeonsOf(),
    publicDungeonZoneIds: publicDungeonsOf(),
  }
}

export const SET_DATA: Record<string, unknown> = setDataOf()
