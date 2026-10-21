import type { ReadingLine } from "akasha/command/pages/temper/modules/stat-reading-lines/stat-reading-lines.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSource } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import type { MetricId } from "akasha/temper/player/character/formula-framework/modules/metric-id/metric-id.module.code.ts"
import { getAggregateMetricIds } from "akasha/temper/player/character/stat/modules/metric-tree-queries/metric-tree-queries.module.code.ts"
import {
  reproduces,
  type SheetRowStat,
  sheetRowStatsOf,
} from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.code.ts"

type Reading = ReadingLine["reading"]

type AdvancedValue = NonNullable<Reading["advancedSheet"]>[string]

type Share = { readonly source: string; readonly category: string; readonly effect: Effect }

export type SheetRow = SheetRowStat & {
  readonly estimate: number | null
  readonly matches: boolean
  readonly stale: boolean
  readonly sources: readonly Share[]
}

function plain(metricId: string): string {
  return (metricId.split("/").at(-1) ?? metricId).replace(/^metric-/, "")
}

function sharesOf(stat: string, sources: readonly EffectSource[]): readonly Share[] {
  const ids: readonly string[] = getAggregateMetricIds(stat as MetricId)
  return sources.flatMap((source) =>
    source.effects
      .filter((effect) => "metricId" in effect && ids.includes(plain(effect.metricId)))
      .map((effect) => ({ source: source.id, category: source.categoryId, effect }))
  )
}

const NUMBER = 8

const FORMAT = "flat-and-percent".length

const PERCENT = 100

const SHOWN = 7

const UNHEADED = "(no header)"

const STALE_SAID = "  held from before a respec, stale"

export function cell(text: string): string {
  return text.padStart(NUMBER)
}

export function signed(delta: number): string {
  return delta > 0 ? `+${String(delta)}` : String(delta)
}

export function sheetRowsOf(
  reading: Reading,
  estimate: ((stat: string) => number) | null,
  sources: readonly EffectSource[] = [],
  staleOf: (stat: string) => boolean = () => false
): readonly SheetRow[] {
  return sheetRowStatsOf(reading.advancedSheet).map((one) => {
    const value = estimate === null ? null : estimate(one.stat)
    return {
      ...one,
      estimate: value,
      matches: value !== null && reproduces(one.stat, value, one.game),
      stale: staleOf(one.stat),
      sources: sharesOf(one.stat, sources),
    }
  })
}

function sheetCell(value: number | undefined): string {
  return cell(value === undefined ? "-" : String(value))
}

function figures(value: number): number {
  return Number(value.toPrecision(SHOWN))
}

function shownOf(row: SheetRow | undefined): number | null {
  if (row === undefined || row.estimate === null) return null
  return row.part === "percent" ? figures(row.estimate * PERCENT) : row.estimate
}

function advancedRow(
  name: string,
  value: AdvancedValue,
  width: number,
  row: SheetRow | undefined
): string {
  const label = value.label === undefined ? "" : `  ${value.label}`
  const shown = shownOf(row)
  const temper = shown === null ? "-" : String(shown)
  const delta = shown === null || row === undefined ? "-" : signed(figures(shown - row.game))
  const mark = row?.stale === true ? "~" : row?.matches === true ? "=" : " "
  const stat = row === undefined ? "" : `  (${row.stat})`
  const stale = row?.stale === true ? STALE_SAID : ""
  const values = `${sheetCell(value.flat)} ${sheetCell(value.percent)} ${cell(temper)} ${cell(delta)}`
  return `  ${mark} ${name.padEnd(width)} ${value.format.padEnd(FORMAT)} ${values}${label}${stat}${stale}`
}

function countSaid(entries: number, rows: readonly SheetRow[]): string {
  const estimated = rows.filter((row) => row.estimate !== null && !row.stale)
  if (estimated.length === 0) return `${String(entries)} stats`
  const matched = estimated.filter((row) => row.matches).length
  return `${String(entries)} stats, ${String(matched)} of ${String(estimated.length)} estimates match`
}

export function advancedSheetLines(
  reading: Reading,
  rows: readonly SheetRow[] = []
): readonly string[] {
  const sheet = reading.advancedSheet
  if (sheet === undefined) return ["  advanced (game): none kept"]
  const entries = Object.entries(sheet).sort(
    ([one, first], [two, second]) =>
      (first.category ?? "").localeCompare(second.category ?? "") || one.localeCompare(two)
  )
  const width = Math.max(4, ...entries.map(([name]) => name.length))
  const head = [cell("flat"), cell("percent"), cell("temper"), cell("diff")].join(" ")
  const lines = [
    `  advanced (game): ${countSaid(entries.length, rows)}`,
    `    ${"stat".padEnd(width)} ${"format".padEnd(FORMAT)} ${head}`,
  ]
  let category: string | undefined
  for (const [name, value] of entries) {
    if (value.category !== undefined && value.category !== category) {
      lines.push(`   ${value.category === "" ? UNHEADED : value.category}`)
    }
    category = value.category
    const named = rows.filter((row) => row.row === name)
    if (named.length === 0) lines.push(advancedRow(name, value, width, undefined))
    for (const row of named) lines.push(advancedRow(name, value, width, row))
  }
  return lines
}
