import type { DataFile } from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import {
  gearTableOf,
  type HeldGearTable,
  heldGearTable,
  inGearOrder,
  slugOf,
} from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"
import { temperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.ts"
import { temperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.ts"
import { temperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.ts"
import { temperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.ts"
import { temperWeaponTrait } from "akasha/temper/catalog/gear/temper-weapon-trait/temper-weapon-trait.page-type.ts"
import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import {
  entryEffectsOf,
  metricNodesOf,
} from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"

export type TraitFamily = "armor" | "weapon" | "jewelry"

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

type TraitEntry = { readonly metric: string; readonly effect: MetricEffect }

type Grade = { readonly metric: string; readonly value: number; readonly raw: number }

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

let entries: ReadonlyMap<string, readonly TraitEntry[]> = new Map()

let grades: ReadonlyMap<string, readonly Grade[]> = new Map()

let esoNumbers: ReadonlyMap<string, number> = new Map()

let traitsByEso: ReadonlyMap<string, string> = new Map()

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

function entriesOf(row: Row, family: TraitFamily, nodes: ReturnType<typeof metricNodesOf>) {
  const at = `the ${family} trait page \`${String(row.slug)}\``
  const said: readonly Row[] = Array.isArray(row.effects) ? row.effects : []
  return said.map(
    (entry): TraitEntry => ({
      metric: String(entry.metricId),
      effect: entryEffectsOf({ effects: [entry] }, nodes, at)[0] as MetricEffect,
    })
  )
}

export function holdTraits(rowsOf: (pageTypeSlug: string) => Iterable<Row>): undefined {
  const nodes = metricNodesOf(rowsOf(temperMetricTree.slug))
  const foundEntries = new Map<string, readonly TraitEntry[]>()
  for (const family of FAMILIES) {
    const rows = inGearOrder(rowsOf(PAGE_TYPES[family]), "hashPlace")
    TABLES[family].hold(gearTableOf(rows.map(traitOf)))
    for (const row of rows) {
      foundEntries.set(`${family}/${String(row.slug)}`, entriesOf(row, family, nodes))
    }
  }
  entries = foundEntries
  const foundGrades = new Map<string, Grade[]>()
  for (const grade of rowsOf(temperGearGrade.slug)) {
    const thing = String(grade.thing)
    const family = FAMILIES.find((one) => thing.startsWith(`${PAGE_TYPES[one]}/`))
    if (family === undefined) continue
    const key = `${family}/${slugOf(thing)}/${slugOf(grade.quality)}`
    const value = Number(grade.value)
    const raw = typeof grade.rawValue === "number" ? grade.rawValue : value
    foundGrades.set(key, [
      ...(foundGrades.get(key) ?? []),
      { metric: String(grade.metric), value, raw },
    ])
  }
  grades = foundGrades
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
}

function gradeOf(
  family: TraitFamily,
  traitId: string,
  quality: EquipmentQualityId,
  metric?: string
): Grade | undefined {
  const found = grades.get(`${family}/${traitId}/${quality}`) ?? []
  const matched = metric === undefined ? undefined : found.find((one) => one.metric === metric)
  return matched ?? (found.length === 1 ? found[0] : undefined)
}

export function traitGradeValue(
  family: TraitFamily,
  traitId: string,
  quality: EquipmentQualityId
): number {
  return gradeOf(family, traitId, quality)?.value ?? 0
}

export function traitEffectsAt(
  family: TraitFamily,
  traitId: string,
  quality: EquipmentQualityId,
  unrounded = false
): readonly MetricEffect[] {
  return (entries.get(`${family}/${traitId}`) ?? []).map(({ metric, effect }) => {
    const grade = gradeOf(family, traitId, quality, metric)
    if (grade === undefined || typeof effect.effectValue !== "number") return effect
    const worth = unrounded ? grade.raw : grade.value
    return { ...effect, effectValue: Math.sign(effect.effectValue) * worth } as MetricEffect
  })
}

export function esoNumberOfTrait(family: TraitFamily, traitId: string): number {
  return esoNumbers.get(`${family}/${traitId}`) ?? 0
}

export function traitOfEsoNumber(family: TraitFamily, esoTraitType: number): string | undefined {
  return traitsByEso.get(`${family}/${esoTraitType}`)
}
