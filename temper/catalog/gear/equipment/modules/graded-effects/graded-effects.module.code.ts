import type { EquipmentQualityId } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import { slugOf } from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"
import { temperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.ts"
import type { MetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import {
  entryEffectsOf,
  metricNodesOf,
} from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"

type Row = Readonly<Record<string, unknown>>

type Entry = { readonly metric: string; readonly effect: MetricEffect }

type Grade = { readonly metric: string; readonly value: number; readonly raw: number }

let entries: ReadonlyMap<string, readonly Entry[]> = new Map()

let grades: ReadonlyMap<string, readonly Grade[]> = new Map()

function entriesOf(row: Row, address: string, nodes: ReturnType<typeof metricNodesOf>) {
  const at = `the page \`${address}\``
  const said: readonly Row[] = Array.isArray(row.effects) ? row.effects : []
  return said.map(
    (entry): Entry => ({
      metric: String(entry.metricId),
      effect: entryEffectsOf({ effects: [entry] }, nodes, at)[0] as MetricEffect,
    })
  )
}

export function holdGraded(
  rowsOf: (pageTypeSlug: string) => Iterable<Row>,
  pageTypeSlugs: readonly string[]
): undefined {
  const nodes = metricNodesOf(rowsOf(temperMetricTree.slug))
  const foundEntries = new Map<string, readonly Entry[]>()
  for (const pageTypeSlug of pageTypeSlugs) {
    for (const row of rowsOf(pageTypeSlug)) {
      const address = `${pageTypeSlug}/${String(row.slug)}`
      foundEntries.set(address, entriesOf(row, address, nodes))
    }
  }
  entries = foundEntries
  const foundGrades = new Map<string, Grade[]>()
  for (const grade of rowsOf(temperGearGrade.slug)) {
    const key = `${String(grade.thing)}/${slugOf(grade.quality)}`
    const value = Number(grade.value)
    const raw = typeof grade.rawValue === "number" ? grade.rawValue : value
    foundGrades.set(key, [
      ...(foundGrades.get(key) ?? []),
      { metric: String(grade.metric), value, raw },
    ])
  }
  grades = foundGrades
}

function gradeOf(address: string, quality: EquipmentQualityId, metric?: string): Grade | undefined {
  const found = grades.get(`${address}/${quality}`) ?? []
  const matched = metric === undefined ? undefined : found.find((one) => one.metric === metric)
  return matched ?? (found.length === 1 ? found[0] : undefined)
}

export function gradedValue(address: string, quality: EquipmentQualityId): number {
  return gradeOf(address, quality)?.value ?? 0
}

export function gradedEffectsAt(
  address: string,
  quality: EquipmentQualityId,
  unrounded = false
): readonly MetricEffect[] {
  return (entries.get(address) ?? []).map(({ metric, effect }) => {
    const grade = gradeOf(address, quality, metric)
    if (grade === undefined || typeof effect.effectValue !== "number") return effect
    const worth = Math.abs(unrounded ? grade.raw : grade.value)
    return { ...effect, effectValue: Math.sign(effect.effectValue) * worth } as MetricEffect
  })
}
