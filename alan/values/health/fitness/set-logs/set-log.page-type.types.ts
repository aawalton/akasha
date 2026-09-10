import type { Page } from "../../../../../pages/page.page-type.types.ts"
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
import type { SetVolume } from "./properties/set-volume.computed-property.ts"
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
  day: Day
  setNumber: SetNumber
  weight?: Weight
  setVolume?: SetVolume
}
