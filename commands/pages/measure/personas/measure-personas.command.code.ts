import { asking } from "@akasha/pages/service/asking"
import { pointsTotalKept } from "akasha/personas/points/keeping/persona-points-keeping.module.code.ts"
import { levelOf } from "akasha/personas/properties/persona-relationship-level.computed-property.code.ts"
import {
  displayNameOf,
  personasStanding,
} from "akasha/personas/reading/persona-reading.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"

const CLOSENESS_LEVEL = "closeness-level"

const LEVEL = "level"

const POINTS_TO_HERE = "pointsToHere"

const PLACES = 2

const NOTHING_KEPT =
  "no persona carries a total, so there is nothing to say. A figure Alan did not earn her would " +
  "be a lie, and no figure at all is not a figure of zero."

export type Named = { readonly slug: string; readonly label: string; readonly path: string }

export type Measured = { readonly label: string; readonly level: number; readonly figure: number }

export function flooredTo(value: number, places: number): number {
  const scale = 10 ** places
  return Math.floor(value * scale) / scale
}

export function rungsIn(root: string): ReadonlyMap<number, number> {
  const found = new Map<number, number>()
  const asked = asking(root, {
    pageTypeSlug: CLOSENESS_LEVEL,
    keys: [LEVEL, POINTS_TO_HERE],
  } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  for (const row of asked.rows) {
    const one = row as Readonly<Record<string, unknown>>
    const rung = one[LEVEL]
    const points = one[POINTS_TO_HERE]
    if (typeof rung === "number" && typeof points === "number") found.set(rung, points)
  }
  return found
}

export function measuredIn(
  named: readonly Named[],
  totalOf: (one: Named) => number | null,
  rungAt: (rung: number) => number | null
): readonly Measured[] {
  const found: Measured[] = []
  for (const one of named) {
    const total = totalOf(one)
    if (total === null) continue
    found.push({
      label: one.label,
      level: levelOf(total, rungAt),
      figure: flooredTo(total, PLACES),
    })
  }
  return [...found].sort(
    (one, two) =>
      two.figure - one.figure || (one.label < two.label ? -1 : one.label > two.label ? 1 : 0)
  )
}

function widestOf(values: readonly string[]): number {
  return values.reduce((most, one) => Math.max(most, one.length), 0)
}

export function linesOf(measured: readonly Measured[]): readonly string[] {
  const cells = measured.map((one) => ({
    label: one.label,
    level: String(one.level),
    figure: one.figure.toFixed(PLACES),
  }))
  const labels = widestOf(cells.map((one) => one.label))
  const levels = widestOf(cells.map((one) => one.level))
  const figures = widestOf(cells.map((one) => one.figure))
  return cells.map(
    (one) =>
      `${one.label.padEnd(labels)}  ${one.level.padStart(levels)}  ${one.figure.padStart(figures)}`
  )
}

export function untotalledOf(named: number, measured: number): readonly string[] {
  const left = named - measured
  if (left <= 0) return []
  return ["", `${String(left)} ${left === 1 ? "persona carries" : "personas carry"} no total yet`]
}

export function measurePersonas(_argv: readonly string[], given: Given): Answer {
  const named = personasStanding(given.root).map((one) => ({
    slug: one.slug,
    label: displayNameOf(one.slug),
    path: one.path,
  }))
  const rungs = rungsIn(given.root)
  const measured = measuredIn(
    named,
    (one) => pointsTotalKept(given.root, one),
    (rung) => rungs.get(rung) ?? null
  )
  if (measured.length === 0) {
    return { report: [], refusals: [NOTHING_KEPT], code: 2 }
  }
  return {
    report: [...linesOf(measured), ...untotalledOf(named.length, measured.length)],
    refusals: [],
    code: 0,
  }
}
