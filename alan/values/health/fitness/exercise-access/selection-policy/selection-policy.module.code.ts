import { landBodies } from "@akasha/command-system/gated-landing"
import { valuesOfType } from "@akasha/indexes"
import { AKASHA, resolveRoots } from "@akasha/pages/checkout-roots"
import { composedFor } from "@akasha/pages-service/composing"
import { selectionPolicy as stated } from "../../selection-policies/pages/selection-policy/selection-policy.selection-policy.ts"

const PERSON = "person"

const ALAN = "alan"

const WRITER = "exercise-profile-writer"

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

function named(pageType: string, slug: string): Carried {
  for (const one of valuesOfType(rootOf(), pageType)) {
    const value: unknown = one.value
    if (typeof value !== "object" || value === null) continue
    const carried = value as Carried
    if (carried["slug"] === slug) return carried
  }
  throw new Error(`no \`${pageType}/${slug}\` page is there, so nothing states what it carries`)
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
  return number(named(PERSON, ALAN), PERSON, "bodyweight")
}

export async function writeBodyweight(bodyweight: number): Promise<string> {
  const was = named(PERSON, ALAN)
  const composed = composedFor(rootOf(), {
    pageTypeSlug: PERSON,
    slug: ALAN,
    values: { ...was, bodyweight },
  })
  if ("refused" in composed) throw new Error(composed.refused)
  const landed = await landBodies(
    { repo: AKASHA, writer: WRITER, message: `record a bodyweight of ${String(bodyweight)}` },
    [{ relPath: composed.put.path, body: composed.put.content }]
  )
  if (!landed.ok) throw new Error(landed.why)
  return composed.put.path
}
