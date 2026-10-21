import {
  SHEET_STATS,
  type StarPoints,
} from "akasha/command/pages/temper/build-show/modules/build-show-fields/build-show-fields.module.code.ts"
import {
  closed,
  closingsOf,
} from "akasha/command/pages/temper/build-show/modules/build-show-gaps/build-show-gaps.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { calculateBuildStatsByBar } from "akasha/temper/player/character/stat/modules/metric-calculator/metric-calculator.module.code.ts"
import { metrics } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.code.ts"

type BarValues = { readonly front: number; readonly back: number }

type StatChange = { readonly stat: string } & BarValues

type Gap = {
  readonly place: string
  readonly want: string
  readonly have: string
  readonly changes: readonly StatChange[]
}

type Total = {
  readonly stat: string
  readonly design: BarValues
  readonly character: BarValues
  readonly difference: BarValues
}

type Gaps = {
  readonly target: string | null
  readonly gaps: readonly Gap[]
  readonly totals: readonly Total[]
}

const BARS = ["primary-weapon-bar", "backup-weapon-bar"] as const

const NOTHING: BarValues = { front: 0, back: 0 }

export function targetStatOf(slug: string, description: string): string | null {
  const catalog = metrics()
  const stated = catalog.ids
    .filter((id) => new RegExp(`(^|[^a-z-])${id}($|[^a-z-])`).test(description))
    .sort((one, two) => two.length - one.length)[0]
  if (stated !== undefined) return stated
  if (!slug.startsWith("max-")) return null
  const maximized = slug.replace(/^(max-)+/, "")
  return [`${maximized}-maximum`, maximized].find((id) => catalog.has(id)) ?? null
}

function valuesOf(build: CharacterState, stats: readonly string[]): ReadonlyMap<string, BarValues> {
  const [front, back] = BARS.map((bar) => calculateBuildStatsByBar(build, bar).metrics)
  const read = (
    worked: Readonly<Record<string, { readonly value: number } | undefined>> | undefined,
    stat: string
  ): number => worked?.[stat]?.value ?? 0
  return new Map(stats.map((stat) => [stat, { front: read(front, stat), back: read(back, stat) }]))
}

function apart(one: BarValues, two: BarValues): BarValues {
  const less = (a: number, b: number): number => Math.round((a - b) * 100) / 100
  return { front: less(one.front, two.front), back: less(one.back, two.back) }
}

function sizeOf(gap: Gap, target: string | null): number {
  const sizes = gap.changes.flatMap((one) =>
    target === null ? [Math.abs(one.front), Math.abs(one.back)] : [one.front, one.back]
  )
  return sizes.length === 0 ? 0 : Math.max(...sizes)
}

export function gapsOf(
  design: CharacterState,
  character: CharacterState,
  target: string | null,
  designStars: readonly StarPoints[] | null = null,
  characterStars: readonly StarPoints[] | null = null
): Gaps {
  const stats: readonly string[] = target === null ? SHEET_STATS : [target]
  const now = valuesOf(character, stats)
  const gaps = closingsOf(design, character, designStars, characterStars).map((closing): Gap => {
    const after = valuesOf(closed(character, closing), stats)
    const changes = stats.flatMap((stat): readonly StatChange[] => {
      const change = { stat, ...apart(after.get(stat) ?? NOTHING, now.get(stat) ?? NOTHING) }
      return target === null && change.front === 0 && change.back === 0 ? [] : [change]
    })
    return { place: closing.place, want: closing.want, have: closing.have, changes }
  })
  const wanted = valuesOf(design, stats)
  const totals = stats
    .map((stat): Total => {
      const want = wanted.get(stat) ?? NOTHING
      const have = now.get(stat) ?? NOTHING
      return { stat, design: want, character: have, difference: apart(want, have) }
    })
    .filter((one) => target !== null || one.difference.front !== 0 || one.difference.back !== 0)
  const sorted = [...gaps].sort((one, two) => sizeOf(two, target) - sizeOf(one, target))
  return { target, gaps: sorted, totals }
}

const SIGNED = new Intl.NumberFormat("en-US", {
  signDisplay: "exceptZero",
  useGrouping: false,
  maximumFractionDigits: 2,
})

function barsText(values: BarValues, sign: boolean): string {
  const said = (value: number): string => (sign ? SIGNED.format(value) : String(value))
  return `front ${said(values.front)}, back ${said(values.back)}`
}

export function gapLines(found: Gaps): readonly string[] {
  const width = Math.max(4, ...found.gaps.map((one) => one.place.length))
  const gaps = found.gaps.flatMap((gap) => [
    `  ${gap.place.padEnd(width)}  ${gap.want} (has ${gap.have})`,
    ...(gap.changes.length === 0
      ? ["      no stat changes"]
      : gap.changes.map((one) => `      ${one.stat}  ${barsText(one, true)}`)),
  ])
  const totals = found.totals.flatMap((one) => [
    `  ${one.stat}`,
    `    design      ${barsText(one.design, false)}`,
    `    character   ${barsText(one.character, false)}`,
    `    difference  ${barsText(one.difference, true)}`,
  ])
  return [
    found.target === null
      ? "target stat: none found, so every stat that changes"
      : `target stat: ${found.target}`,
    `${String(found.gaps.length)} gaps, largest first`,
    ...gaps,
    "",
    "totals (Temper)",
    ...totals,
  ]
}
