import { valuesOfType } from "@akasha/indexes"
import { patchPage } from "@akasha/markdown-pages/page-write"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
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

type Carried = Readonly<Record<string, unknown>>

function rootOf(): string {
  const roots = resolveRoots()
  const at = roots[roots.target ?? "akasha"]
  if (at === undefined) {
    throw new Error("the roots name no akasha checkout, so the page index cannot be read")
  }
  return at
}

function only(pageType: string): Carried {
  const found = valuesOfType(rootOf(), pageType)
  const [one, second] = found
  if (one === undefined) {
    throw new Error(`no \`${pageType}\` page is there, so nothing states what it carries`)
  }
  if (second !== undefined) {
    throw new Error(
      `${String(found.length)} \`${pageType}\` pages are there where one carries them, so none of them holds`
    )
  }
  const value: unknown = one.value
  if (typeof value !== "object" || value === null) {
    throw new Error(`the \`${pageType}\` page carries no values, so nothing states what it holds`)
  }
  return value as Carried
}

function number(carried: Carried, pageType: string, key: string): number {
  const held = carried[key]
  const value =
    typeof held === "number" ? held : typeof held === "string" ? Number(held) : Number.NaN
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

export async function writeBodyweight(bodyweight: number): Promise<string> {
  const written = await patchPage(resolveRoots(), PROFILE, PROFILE, { bodyweight })
  if (written === null) throw new Error(`\`${PROFILE}\` names no page type whose pages are files`)
  if (written.commitError !== null) throw new Error(written.commitError)
  return written.relPath
}
