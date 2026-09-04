import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { AnchorBlockWeeks } from "./properties/anchor-block-weeks.number-property.ts"
import type { AnchorEscapeRpeCeiling } from "./properties/anchor-escape-rpe-ceiling.number-property.ts"
import type { LayoffGraceDays } from "./properties/layoff-grace-days.number-property.ts"
import type { LayoffMaxLoadReduction } from "./properties/layoff-max-load-reduction.number-property.ts"
import type { LayoffSaturationDays } from "./properties/layoff-saturation-days.number-property.ts"
import type { NoveltyCapPerSession } from "./properties/novelty-cap-per-session.number-property.ts"
import type { RecencySaturationDays } from "./properties/recency-saturation-days.number-property.ts"
import type { RecencyWeight } from "./properties/recency-weight.number-property.ts"
import type { WeeklySetCeiling } from "./properties/weekly-set-ceiling.number-property.ts"
import type { WeeklySetFloor } from "./properties/weekly-set-floor.number-property.ts"
import type { WeightAesthetics } from "./properties/weight-aesthetics.number-property.ts"
import type { WeightEnergy } from "./properties/weight-energy.number-property.ts"
import type { WeightFunctionality } from "./properties/weight-functionality.number-property.ts"
import type { WeightLongevity } from "./properties/weight-longevity.number-property.ts"
import type { Zone2WeeklyFloor } from "./properties/zone2-weekly-floor.number-property.ts"

export type SelectionPolicy = Page & {
  weightLongevity: WeightLongevity
  weightEnergy: WeightEnergy
  weightFunctionality: WeightFunctionality
  weightAesthetics: WeightAesthetics
  noveltyCapPerSession: NoveltyCapPerSession
  anchorBlockWeeks: AnchorBlockWeeks
  anchorEscapeRpeCeiling: AnchorEscapeRpeCeiling
  layoffGraceDays: LayoffGraceDays
  layoffMaxLoadReduction: LayoffMaxLoadReduction
  layoffSaturationDays: LayoffSaturationDays
  weeklySetFloor: WeeklySetFloor
  weeklySetCeiling: WeeklySetCeiling
  zone2WeeklyFloor: Zone2WeeklyFloor
  recencyWeight: RecencyWeight
  recencySaturationDays: RecencySaturationDays
}

export const selectionPolicy = {
  id: "01a06838-7a9d-7d0a-8e41-674ebea29caf",
  pageTypeSlug: "page-type",
  slug: "selection-policy",
  definition: "the numbers the coach picks and bounds a session by",
  pluralSlug: "selection-policies",
  extendsSlug: "page-type/page",
  partSlugs: [
    "number-property/anchor-block-weeks",
    "number-property/anchor-escape-rpe-ceiling",
    "number-property/layoff-grace-days",
    "number-property/layoff-max-load-reduction",
    "number-property/layoff-saturation-days",
    "number-property/novelty-cap-per-session",
    "number-property/recency-saturation-days",
    "number-property/recency-weight",
    "number-property/weekly-set-ceiling",
    "number-property/weekly-set-floor",
    "number-property/weight-aesthetics",
    "number-property/weight-energy",
    "number-property/weight-functionality",
    "number-property/weight-longevity",
    "number-property/zone2-weekly-floor",
  ],
  properties: [
    { pagePropertySlug: "weight-longevity", required: true, many: false },
    { pagePropertySlug: "weight-energy", required: true, many: false },
    { pagePropertySlug: "weight-functionality", required: true, many: false },
    { pagePropertySlug: "weight-aesthetics", required: true, many: false },
    { pagePropertySlug: "novelty-cap-per-session", required: true, many: false },
    { pagePropertySlug: "anchor-block-weeks", required: true, many: false },
    { pagePropertySlug: "anchor-escape-rpe-ceiling", required: true, many: false },
    { pagePropertySlug: "layoff-grace-days", required: true, many: false },
    { pagePropertySlug: "layoff-max-load-reduction", required: true, many: false },
    { pagePropertySlug: "layoff-saturation-days", required: true, many: false },
    { pagePropertySlug: "weekly-set-floor", required: true, many: false },
    { pagePropertySlug: "weekly-set-ceiling", required: true, many: false },
    { pagePropertySlug: "zone2-weekly-floor", required: true, many: false },
    { pagePropertySlug: "recency-weight", required: true, many: false },
    { pagePropertySlug: "recency-saturation-days", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One page carries the numbers, and there is never a second.",
    },
    {
      invariantKind: "departure",
      statement: "Every number the selector weighs by stands on this page rather than in code.",
    },
    {
      invariantKind: "constraint",
      statement: "A number missing here stops the selector rather than coming from somewhere else.",
    },
    {
      invariantKind: "departure",
      statement: "Each number the selector reads stands as a property of this page type.",
    },
  ],
} as const satisfies PageType
