import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { WorkoutScheduleActive } from "./properties/workout-schedule-active.boolean-property.ts"
import type { WorkoutScheduleDescription } from "./properties/workout-schedule-description.text-property.ts"

export type WorkoutSchedule = Page & {
  title: Title
  workoutScheduleActive: WorkoutScheduleActive
  workoutScheduleDescription?: WorkoutScheduleDescription
}

export const workoutSchedule = {
  id: "01a0657a-e618-70c5-b2cf-b1655f061afa",
  pageTypeSlug: "page-type",
  slug: "workout-schedule",
  definition: "a rotation of training days Alan works through",
  pluralSlug: "workout-schedules",
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/workout-schedule-active",
    "text-property/workout-schedule-description",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "workout-schedule-active", required: true, many: false },
    { pagePropertySlug: "workout-schedule-description", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "upkeep",
      statement: "Exactly one schedule is the active one.",
    },
  ],
} as const satisfies PageType
