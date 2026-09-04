import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { ScheduleDaySlug } from "./properties/schedule-day-slug.relation-property.ts"
import type { WorkoutSessionCompletedAt } from "./properties/workout-session-completed-at.instant-property.ts"
import type { WorkoutSessionDate } from "./properties/workout-session-date.calendar-date-property.ts"
import type { WorkoutSessionNotes } from "./properties/workout-session-notes.text-property.ts"
import type { WorkoutSessionStartedAt } from "./properties/workout-session-started-at.instant-property.ts"

export type WorkoutSession = Page & {
  title: Title
  workoutSessionCompletedAt: WorkoutSessionCompletedAt
  workoutSessionDate: WorkoutSessionDate
  notes?: WorkoutSessionNotes
  scheduleDaySlug: ScheduleDaySlug
  workoutSessionStartedAt: WorkoutSessionStartedAt
}

export const workoutSession = {
  id: "01a06580-5ee5-7910-8166-f0cd56fc50de",
  pageTypeSlug: "page-type",
  slug: "workout-session",
  definition: "one occasion Alan trained",
  pluralSlug: "workout-sessions",
  extendsSlug: "page-type/page",
  partSlugs: [
    "calendar-date-property/workout-session-date",
    "instant-property/workout-session-completed-at",
    "instant-property/workout-session-started-at",
    "relation-property/schedule-day-slug",
    "text-property/workout-session-notes",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "workout-session-completed-at", required: true, many: false },
    { pagePropertySlug: "workout-session-date", required: true, many: false },
    { pagePropertySlug: "workout-session-notes", required: false, many: false },
    { pagePropertySlug: "schedule-day-slug", required: true, many: false },
    { pagePropertySlug: "workout-session-started-at", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A session names the day of the rotation it was taken against.",
    },
    {
      invariantKind: "departure",
      statement: "Two sessions fall on one day where Alan trained twice.",
    },
  ],
} as const satisfies PageType
