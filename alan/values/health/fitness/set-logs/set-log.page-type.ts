import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../../../pages/properties/title.text-property.ts"
import type { ActivityType } from "./properties/activity-type.select-property.ts"
import type { Day } from "./properties/day.relation-property.ts"
import type { Distance } from "./properties/distance.number-property.ts"
import type { DurationSeconds } from "./properties/duration-seconds.number-property.ts"
import type { Exercise } from "./properties/exercise.relation-property.ts"
import type { IsWarmup } from "./properties/is-warmup.boolean-property.ts"
import type { Note } from "./properties/note.text-property.ts"
import type { Reps } from "./properties/reps.number-property.ts"
import type { Rpe } from "./properties/rpe.number-property.ts"
import type { SessionSlug } from "./properties/session-slug.text-property.ts"
import type { SetLogDate } from "./properties/set-log-date.calendar-date-property.ts"
import type { SetNumber } from "./properties/set-number.number-property.ts"
import type { Weight } from "./properties/weight.number-property.ts"

export type SetLog = Page & {
  title: Title
  activityType?: ActivityType
  distance?: Distance
  durationSeconds?: DurationSeconds
  exercise: Exercise
  isWarmup?: IsWarmup
  note?: Note
  reps?: Reps
  rpe?: Rpe
  sessionSlug: SessionSlug
  setLogDate: SetLogDate
  setNumber: SetNumber
  day: Day
  weight?: Weight
}

export const setLog = {
  id: "01a06580-66fc-7e15-9138-eda9b0267961",
  pageTypeSlug: "page-type",
  slug: "set-log",
  definition: "one set Alan performed, as it was recorded",
  pluralSlug: "set-logs",
  extends: ["page-type/page"],
  partSlugs: [
    "boolean-property/is-warmup",
    "calendar-date-property/set-log-date",
    "number-property/distance",
    "number-property/duration-seconds",
    "number-property/reps",
    "number-property/rpe",
    "number-property/set-number",
    "number-property/weight",
    "relation-property/exercise",
    "text-property/session-slug",
    "relation-property/day",
    "computed-property/set-volume",
    "select-property/activity-type",
    "text-property/note",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "select-property/activity-type", required: false, many: false },
    { pagePropertySlug: "number-property/distance", required: false, many: false },
    { pagePropertySlug: "number-property/duration-seconds", required: false, many: false },
    { pagePropertySlug: "relation-property/exercise", required: true, many: false },
    { pagePropertySlug: "boolean-property/is-warmup", required: false, many: false },
    { pagePropertySlug: "text-property/note", required: false, many: false },
    { pagePropertySlug: "number-property/reps", required: false, many: false },
    { pagePropertySlug: "number-property/rpe", required: false, many: false },
    { pagePropertySlug: "text-property/session-slug", required: true, many: false },
    { pagePropertySlug: "calendar-date-property/set-log-date", required: true, many: false },
    { pagePropertySlug: "relation-property/day", required: true, many: false },
    { pagePropertySlug: "number-property/set-number", required: true, many: false },
    { pagePropertySlug: "number-property/weight", required: false, many: false },
    { pagePropertySlug: "computed-property/set-volume", required: false, many: false },
  ],
  worked: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A set states the bout that set was logged in and names the movement that set was of.",
    },
    {
      invariantKind: "departure",
      statement: "A set states the day that set was performed.",
    },
    {
      invariantKind: "departure",
      statement: "A set names the tracked day that set falls on.",
    },
    {
      invariantKind: "departure",
      statement: "The day a set names is the day that set's own date spells.",
    },
    {
      invariantKind: "absence",
      statement: "A set states no volume of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A set's volume is worked out from the set and the movement and the lifter.",
    },
    {
      invariantKind: "departure",
      statement:
        "A set timed rather than counted has an activity and a length in place of reps and weight.",
    },
  ],
} as const satisfies PageType
