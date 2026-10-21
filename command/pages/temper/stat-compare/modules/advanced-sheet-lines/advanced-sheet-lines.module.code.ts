import type { ReadingLine } from "akasha/command/pages/temper/modules/stat-reading-lines/stat-reading-lines.module.code.ts"
import {
  reproduces,
  type SheetRowStat,
  sheetRowStatsOf,
} from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.code.ts"

type Reading = ReadingLine["reading"]

type AdvancedValue = NonNullable<Reading["advancedSheet"]>[string]

export type SheetRow = SheetRowStat & {
  readonly estimate: number | null
  readonly matches: boolean
}

const NUMBER = 8

const FORMAT = "flat-and-percent".length

const PERCENT = 100

const SHOWN = 7

const UNHEADED = "(no header)"

export function cell(text: string): string {
  return text.padStart(NUMBER)
}

export function signed(delta: number): string {
  return delta > 0 ? `+${String(delta)}` : String(delta)
}

export function sheetRowsOf(
  reading: Reading,
  estimate: ((stat: string) => number) | null
): readonly SheetRow[] {
  return sheetRowStatsOf(reading.advancedSheet).map((one) => {
    const value = estimate === null ? null : estimate(one.stat)
    return {
      ...one,
      estimate: value,
      matches: value !== null && reproduces(one.stat, value, one.game),
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
  const mark = row?.matches === true ? "=" : " "
  const stat = row === undefined ? "" : `  (${row.stat})`
  const values = `${sheetCell(value.flat)} ${sheetCell(value.percent)} ${cell(temper)} ${cell(delta)}`
  return `  ${mark} ${name.padEnd(width)} ${value.format.padEnd(FORMAT)} ${values}${label}${stat}`
}

function countSaid(entries: number, rows: readonly SheetRow[]): string {
  const estimated = rows.filter((row) => row.estimate !== null)
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
