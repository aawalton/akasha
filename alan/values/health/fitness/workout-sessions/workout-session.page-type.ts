import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../../../pages/properties/title.text-property.ts"
import type { ScheduleDaySlug } from "./properties/schedule-day-slug.relation-property.ts"
import type { WakeDaySlug } from "./properties/wake-day-slug.relation-property.ts"
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
  wakeDaySlug?: WakeDaySlug
}

export const workoutSession = {
  id: "01a06580-5ee5-7910-8166-f0cd56fc50de",
  pageTypeSlug: "page-type",
  slug: "workout-session",
  definition: "one occasion Alan trained",
  pluralSlug: "workout-sessions",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "calendar-date-property/workout-session-date",
    "computed-property/session-volume",
    "instant-property/workout-session-completed-at",
    "instant-property/workout-session-started-at",
    "relation-property/schedule-day-slug",
    "relation-property/wake-day-slug",
    "text-property/workout-session-notes",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    {
      pagePropertySlug: "instant-property/workout-session-completed-at",
      required: true,
      many: false,
    },
    {
      pagePropertySlug: "calendar-date-property/workout-session-date",
      required: true,
      many: false,
    },
    { pagePropertySlug: "text-property/workout-session-notes", required: false, many: false },
    { pagePropertySlug: "relation-property/schedule-day-slug", required: true, many: false },
    {
      pagePropertySlug: "instant-property/workout-session-started-at",
      required: true,
      many: false,
    },
    { pagePropertySlug: "relation-property/wake-day-slug", required: false, many: false },
    { pagePropertySlug: "computed-property/session-volume", required: false, many: false },
  ],
  worked: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A session names the day of the rotation that session was taken against.",
    },
    {
      invariantKind: "departure",
      statement: "Two sessions fall on one day where Alan trained twice.",
    },
    {
      invariantKind: "departure",
      statement: "A session names the tracked day that session falls on.",
    },
    {
      invariantKind: "departure",
      statement: "A session falling on a day no page tracks names no day.",
    },
    {
      invariantKind: "absence",
      statement: "A session states no volume of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A session's volume is worked out from the sets naming that session.",
    },
  ],
} as const satisfies PageType
