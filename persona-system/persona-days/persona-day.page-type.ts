import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { BreathingPoints } from "../../alan/tracking/daily/wake-days/properties/breathing-points.number-property.ts"
import type { CardioPoints } from "../../alan/tracking/daily/wake-days/properties/cardio-points.number-property.ts"
import type { Date as TrackedDate } from "../../alan/tracking/daily/wake-days/properties/date.text-property.ts"
import type { NutritionPoints } from "../../alan/tracking/daily/wake-days/properties/nutrition-points.number-property.ts"
import type { SleepPoints } from "../../alan/tracking/daily/wake-days/properties/sleep-points.number-property.ts"
import type { StrengthPoints } from "../../alan/tracking/daily/wake-days/properties/strength-points.number-property.ts"
import type { StrengthVolume } from "../../alan/tracking/daily/wake-days/properties/strength-volume.number-property.ts"
import type { TaskPoints } from "../../alan/tracking/daily/wake-days/properties/task-points.number-property.ts"
import type { GreenDayPoints } from "../personas/properties/green-day-points.number-property.ts"
import type { ValueSlug } from "../personas/properties/value-slug.text-property.ts"
import type { BytePoints } from "./properties/byte-points.number-property.ts"
import type { DayPersonaSlug } from "./properties/day-persona-slug.relation-property.ts"
import type { SourcePoints } from "./properties/source-points.number-property.ts"
import type { SourceTotalSnapshot } from "./properties/source-total-snapshot.number-property.ts"

export type PersonaDay = Page & {
  personaSlug: DayPersonaSlug
  date: TrackedDate
  greenDayPoints: GreenDayPoints
  sourcePoints: SourcePoints
  valueSlug?: ValueSlug
  sourceTotalSnapshot?: SourceTotalSnapshot
  taskPoints?: TaskPoints
  sleepPoints?: SleepPoints
  strengthPoints?: StrengthPoints
  strengthVolume?: StrengthVolume
  cardioPoints?: CardioPoints
  nutritionPoints?: NutritionPoints
  breathingPoints?: BreathingPoints
  bytePoints?: BytePoints
}

export const personaDay = {
  id: "01a06551-d6a6-7003-8c3c-64c0bea3f989",
  pageTypeSlug: "page-type",
  slug: "persona-day",
  definition: "what one persona earned on one day",
  pluralSlug: "persona-days",
  extendsSlug: "page-type/page",
  partSlugs: [
    "number-property/byte-points",
    "number-property/source-points",
    "number-property/source-total-snapshot",
    "formula-property/green-day-fraction",
    "formula-property/green-day-rung",
    "formula-property/points",
    "relation-property/day-persona-slug",
  ],
  properties: [
    { pagePropertySlug: "day-persona-slug", required: true, many: false },
    { pagePropertySlug: "date", required: true, many: false },
    { pagePropertySlug: "green-day-points", required: true, many: false },
    { pagePropertySlug: "source-points", required: true, many: false },
    { pagePropertySlug: "value-slug", required: false, many: false },
    { pagePropertySlug: "source-total-snapshot", required: false, many: false },
    { pagePropertySlug: "task-points", required: false, many: false },
    { pagePropertySlug: "sleep-points", required: false, many: false },
    { pagePropertySlug: "strength-points", required: false, many: false },
    { pagePropertySlug: "strength-volume", required: false, many: false },
    { pagePropertySlug: "cardio-points", required: false, many: false },
    { pagePropertySlug: "nutrition-points", required: false, many: false },
    { pagePropertySlug: "breathing-points", required: false, many: false },
    { pagePropertySlug: "byte-points", required: false, many: false },
    { pagePropertySlug: "points", required: false, many: false },
    { pagePropertySlug: "green-day-fraction", required: false, many: false },
    { pagePropertySlug: "green-day-rung", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One persona and one day is one page.",
    },
    {
      invariantKind: "departure",
      statement: "A persona day is slugged by the persona and then the day.",
    },
    {
      invariantKind: "departure",
      statement:
        "The green-day points on a day are the figure the persona stated when the day was scored.",
    },
    {
      invariantKind: "departure",
      statement: "A persona's green-day points moving leaves the days already scored as they were.",
    },
    {
      invariantKind: "departure",
      statement: "The three figures a day is read by are worked out rather than stored.",
    },
    {
      invariantKind: "departure",
      statement: "A persona's total points are her lifetime figure rather than a sum of her days.",
    },
    {
      invariantKind: "departure",
      statement: "A wake day names by identity the persona days recorded against that wake day.",
    },
    {
      invariantKind: "departure",
      statement: "An identity here is what Alan's history is keyed by.",
    },
  ],
} as const satisfies PageType
