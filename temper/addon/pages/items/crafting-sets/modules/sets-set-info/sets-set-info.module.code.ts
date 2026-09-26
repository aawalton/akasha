import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.ts"
import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import type { TemperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.types.ts"

type InfoSet = Pick<
  TemperSet,
  | "esoSetId"
  | "classId"
  | "setTypeId"
  | "setDlcId"
  | "setDropMechanics"
  | "setDropLocationNamesDe"
  | "setDropLocationNamesEn"
  | "setProcsAllowedInPvp"
  | "setTraitsNeeded"
  | "setUndauntedChestId"
  | "setVeteran"
  | "setVeteranEquipTypes"
  | "setWayshrines"
  | "setDropZones"
>

type ClassOf = Pick<TemperClass, "slug" | "esoClassId">

type PlaceNames = { [language: string]: readonly string[] }

function classIdsOf(this: void): { [classId: string]: number } {
  const found: { [classId: string]: number } = {}
  for (const one of $pagesOfType<ClassOf>(temperClass)) {
    found[`${temperClass.slug}/${one.slug}`] = one.esoClassId
  }
  return found
}

function placeNamesOf(this: void, set: InfoSet): PlaceNames | undefined {
  const de = set.setDropLocationNamesDe ?? []
  const en = set.setDropLocationNamesEn ?? []
  if (de.length === 0 && en.length === 0) return undefined
  const found: PlaceNames = {}
  if (de.length > 0) found["de"] = de
  if (en.length > 0) found["en"] = en
  return found
}

function veteranOf(this: void, set: InfoSet): boolean | { [slot: number]: boolean } {
  const slots = set.setVeteranEquipTypes ?? []
  if (slots.length === 0) return set.setVeteran === true
  const found: { [slot: number]: boolean } = {}
  for (const slot of slots) {
    const constant = _G[slot]
    if (typeof constant === "number") found[constant] = true
  }
  return found
}

function setInfoOf(this: void): Record<number, Record<string, unknown>> {
  const classIds = classIdsOf()
  const found: Record<number, Record<string, unknown>> = {}
  for (const set of $pagesOfType<InfoSet>(temperSet)) {
    if (set.setTypeId === undefined) continue
    found[set.esoSetId] = {
      dlcId: set.setDlcId ?? 0,
      dropMechanic: set.setDropMechanics ?? [],
      dropMechanicDropLocationNames: placeNamesOf(set),
      isProcSetAllowedInPvP: set.setProcsAllowedInPvp === true ? 1 : undefined,
      setType: set.setTypeId,
      traitsNeeded: set.setTraitsNeeded,
      undauntedChestId: set.setUndauntedChestId,
      classId: set.classId === undefined ? undefined : classIds[set.classId],
      veteran: veteranOf(set),
      wayshrines: set.setWayshrines ?? [],
      zoneIds: set.setDropZones ?? [],
    }
  }
  return found
}

export const SET_INFO: Record<number, Record<string, unknown>> = setInfoOf()
