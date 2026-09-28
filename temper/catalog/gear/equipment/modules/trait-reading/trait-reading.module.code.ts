import type { DataFile } from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import {
  gradedEffectsAt,
  gradedValue,
} from "akasha/temper/catalog/gear/equipment/modules/graded-effects/graded-effects.module.code.ts"
import {
  gearTableOf,
  type HeldGearTable,
  heldGearTable,
  inGearOrder,
  slugOf,
} from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"
import { temperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.ts"
import { temperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.ts"
import { temperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.ts"
import { temperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.ts"
import { temperJewelryType } from "akasha/temper/catalog/gear/temper-jewelry-type/temper-jewelry-type.page-type.ts"
import { temperWeaponTrait } from "akasha/temper/catalog/gear/temper-weapon-trait/temper-weapon-trait.page-type.ts"
import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

type TraitFamily = "armor" | "weapon" | "jewelry"

export interface TraitTemplate<Id extends string = string> {
  readonly id: Id
  readonly name: string
  readonly esoTraitConstantName: string
  readonly material: string
  readonly effect: string
  readonly available: boolean
}

type Row = Readonly<Record<string, unknown>>

type Read = readonly [string, readonly string[]]

const PAGE_TYPES: Readonly<Record<TraitFamily, string>> = {
  armor: temperArmorTrait.slug,
  weapon: temperWeaponTrait.slug,
  jewelry: temperJewelryTrait.slug,
}

const FAMILIES: readonly TraitFamily[] = ["armor", "weapon", "jewelry"]

const TRAIT_FIELDS: readonly string[] = [
  "slug",
  "title",
  "esoTraitConstantName",
  "material",
  "effect",
  "available",
  "effects",
  "hashPlace",
]

export const TRAIT_READS: readonly Read[] = [
  ...FAMILIES.map((family): Read => [PAGE_TYPES[family], TRAIT_FIELDS]),
  [temperEsoTraitMap.slug, ["slug", "traitFamily", "traitId", "esoTraitNum"]],
]

const TABLES: Readonly<Record<TraitFamily, HeldGearTable<string, TraitTemplate>>> = {
  armor: heldGearTable("armor traits"),
  weapon: heldGearTable("weapon traits"),
  jewelry: heldGearTable("jewelry traits"),
}

let esoNumbers: ReadonlyMap<string, number> = new Map()

let traitsByEso: ReadonlyMap<string, string> = new Map()

let jewelryEquipTypes: ReadonlySet<number> = new Set()

export function traitTable<Id extends string>(
  family: TraitFamily
): DataFile<Id, TraitTemplate<Id>> {
  return TABLES[family].table as DataFile<Id, TraitTemplate<Id>>
}

export function offeredTraits<Id extends string>(
  table: DataFile<Id, TraitTemplate<Id>>,
  current: string
): readonly TraitTemplate<Id>[] {
  return table.list.filter((one) => one.available || one.id === current)
}

function traitOf(row: Row): TraitTemplate {
  return {
    id: String(row.slug),
    name: String(row.title),
    esoTraitConstantName: String(row.esoTraitConstantName),
    material: typeof row.material === "string" ? row.material : "",
    effect: typeof row.effect === "string" ? row.effect : "",
    available: row.available === true,
  }
}

export function holdTraits(rowsOf: (pageTypeSlug: string) => Iterable<Row>): undefined {
  for (const family of FAMILIES) {
    const rows = inGearOrder(rowsOf(PAGE_TYPES[family]), "hashPlace")
    TABLES[family].hold(gearTableOf(rows.map(traitOf)))
  }
  const foundNumbers = new Map<string, number>()
  const foundTraits = new Map<string, string>()
  for (const row of rowsOf(temperEsoTraitMap.slug)) {
    const family = String(row.traitFamily)
    const traitId = slugOf(row.traitId)
    const esoNumber = Number(row.esoTraitNum)
    foundNumbers.set(`${family}/${traitId}`, esoNumber)
    if (esoNumber !== 0) foundTraits.set(`${family}/${esoNumber}`, traitId)
  }
  esoNumbers = foundNumbers
  traitsByEso = foundTraits
  const equipNumbers = new Map<string, number>()
  for (const row of rowsOf(temperEquipType.slug)) {
    equipNumbers.set(String(row.slug), Number(row.equipType))
  }
  const foundJewelry = new Set<number>()
  for (const row of rowsOf(temperJewelryType.slug)) {
    const number = equipNumbers.get(slugOf(row.slotEquipType))
    if (number !== undefined) foundJewelry.add(number)
  }
  jewelryEquipTypes = foundJewelry
}

export function isJewelryEquipType(equipType: number): boolean {
  return jewelryEquipTypes.has(equipType)
}

export function traitGradeValue(
  family: TraitFamily,
  traitId: string,
  quality: EquipmentQualityId
): number {
  return gradedValue(`${PAGE_TYPES[family]}/${traitId}`, quality)
}

export function traitEffectsAt(
  family: TraitFamily,
  traitId: string,
  quality: EquipmentQualityId,
  unrounded = false
): readonly MetricEffect[] {
  return gradedEffectsAt(`${PAGE_TYPES[family]}/${traitId}`, quality, unrounded)
}

export function esoNumberOfTrait(family: TraitFamily, traitId: string): number {
  return esoNumbers.get(`${family}/${traitId}`) ?? 0
}

export function traitOfEsoNumber(family: TraitFamily, esoTraitType: number): string | undefined {
  return traitsByEso.get(`${family}/${esoTraitType}`)
}
