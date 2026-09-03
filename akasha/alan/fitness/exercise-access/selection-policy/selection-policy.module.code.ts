import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import type { Row } from "@tools/lib/page-derive-shape"
import { answer } from "@tools/lib/page-query"
import { textOf } from "@tools/lib/page-query-values"
import { patchPage } from "@tools/lib/page-write"
import { selectionPolicy as stated } from "../../selection-policies/pages/selection-policy/selection-policy.selection-policy.ts"

const PROFILE = "client-profile"

export interface GoalWeights {
  readonly longevity: number
  readonly energy: number
  readonly functionality: number
  readonly aesthetics: number
}

export interface SelectionPolicy {
  readonly weights: GoalWeights
  readonly noveltyCapPerSession: number
  readonly anchorBlockWeeks: number
  readonly weeklySetFloor: number
  readonly weeklySetCeiling: number
  readonly zone2WeeklyFloor: number
  readonly recencyWeight: number
  readonly recencySaturationDays: number
}

function only(pageType: string): Row {
  const found = answer(resolveRoots(), { pageType })
  if (found === null) throw new Error(`\`${pageType}\` names no page type whose pages are files`)
  const [row, second] = found.rows
  if (row === undefined)
    throw new Error(`no \`${pageType}\` page is there, so nothing states what it carries`)
  if (second !== undefined) {
    throw new Error(
      `${found.n} \`${pageType}\` pages are there where one carries them, so none of them holds`
    )
  }
  return row
}

function number(row: Row, pageType: string, key: string): number {
  const held = textOf(row.values, key)
  const value = held === null ? Number.NaN : Number(held)
  if (!Number.isFinite(value)) {
    throw new Error(
      `the \`${pageType}\` page states no number for \`${key}\`, so nothing supplies it`
    )
  }
  return value
}

export function readSelectionPolicy(): SelectionPolicy {
  return {
    weights: {
      longevity: stated.weightLongevity,
      energy: stated.weightEnergy,
      functionality: stated.weightFunctionality,
      aesthetics: stated.weightAesthetics,
    },
    noveltyCapPerSession: stated.noveltyCapPerSession,
    anchorBlockWeeks: stated.anchorBlockWeeks,
    weeklySetFloor: stated.weeklySetFloor,
    weeklySetCeiling: stated.weeklySetCeiling,
    zone2WeeklyFloor: stated.zone2WeeklyFloor,
    recencyWeight: stated.recencyWeight,
    recencySaturationDays: stated.recencySaturationDays,
  }
}

export function selectionPolicyStated(): ReadonlyMap<string, number> {
  const held = new Map<string, number>()
  for (const [key, value] of Object.entries(stated)) {
    if (typeof value === "number") held.set(key, value)
  }
  return held
}

export function readBodyweight(): number {
  return number(only(PROFILE), PROFILE, "bodyweight")
}

export function writeBodyweight(bodyweight: number): string {
  const written = patchPage(resolveRoots(), PROFILE, PROFILE, { bodyweight })
  if (written === null) throw new Error(`\`${PROFILE}\` names no page type whose pages are files`)
  if (written.commitError !== null) throw new Error(written.commitError)
  return written.relPath
}
