import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { ActivityType } from "./properties/activity-type.select-property.ts"
import type { Distance } from "./properties/distance.number-property.ts"
import type { DurationSeconds } from "./properties/duration-seconds.number-property.ts"
import type { ExerciseSlug } from "./properties/exercise-slug.relation-property.ts"
import type { IsWarmup } from "./properties/is-warmup.boolean-property.ts"
import type { Note } from "./properties/note.text-property.ts"
import type { Reps } from "./properties/reps.number-property.ts"
import type { Rpe } from "./properties/rpe.number-property.ts"
import type { SessionSlug } from "./properties/session-slug.relation-property.ts"
import type { SetNumber } from "./properties/set-number.number-property.ts"
import type { Weight } from "./properties/weight.number-property.ts"

export type SetLog = Page & {
  title: Title
  activityType?: ActivityType
  distance?: Distance
  durationSeconds?: DurationSeconds
  exerciseSlug: ExerciseSlug
  isWarmup?: IsWarmup
  note?: Note
  reps?: Reps
  rpe?: Rpe
  sessionSlug: SessionSlug
  setNumber: SetNumber
  weight?: Weight
}

export const setLog = {
  id: "01a06580-66fc-7e15-9138-eda9b0267961",
  pageTypeSlug: "page-type",
  slug: "set-log",
  definition: "one set Alan performed, as it was recorded",
  pluralSlug: "set-logs",
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/is-warmup",
    "number-property/distance",
    "number-property/duration-seconds",
    "number-property/reps",
    "number-property/rpe",
    "number-property/set-number",
    "number-property/weight",
    "relation-property/exercise-slug",
    "relation-property/session-slug",
    "select-property/activity-type",
    "text-property/note",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "activity-type", required: false, many: false },
    { pagePropertySlug: "distance", required: false, many: false },
    { pagePropertySlug: "duration-seconds", required: false, many: false },
    { pagePropertySlug: "exercise-slug", required: true, many: false },
    { pagePropertySlug: "is-warmup", required: false, many: false },
    { pagePropertySlug: "text-property/note", required: false, many: false },
    { pagePropertySlug: "reps", required: false, many: false },
    { pagePropertySlug: "rpe", required: false, many: false },
    { pagePropertySlug: "session-slug", required: true, many: false },
    { pagePropertySlug: "set-number", required: true, many: false },
    { pagePropertySlug: "weight", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A set names the session it was logged in and the movement it was of.",
    },
    {
      invariantKind: "absence",
      statement: "A session lists no set of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A set timed rather than counted carries an activity and a length in place of reps and weight.",
    },
  ],
} as const satisfies PageType
