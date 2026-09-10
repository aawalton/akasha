import type { Page } from "../../../../../pages/page.page-type.types.ts"
import type { Title } from "../../../../../pages/properties/title.text-property.ts"
import type { ActivityType } from "./properties/activity-type.select-property.types.ts"
import type { Day } from "./properties/day.relation-property.types.ts"
import type { Distance } from "./properties/distance.number-property.types.ts"
import type { DurationSeconds } from "./properties/duration-seconds.number-property.types.ts"
import type { Exercise } from "./properties/exercise.relation-property.types.ts"
import type { IsWarmup } from "./properties/is-warmup.boolean-property.types.ts"
import type { Note } from "./properties/note.text-property.ts"
import type { Reps } from "./properties/reps.number-property.types.ts"
import type { Rpe } from "./properties/rpe.number-property.types.ts"
import type { SessionSlug } from "./properties/session-slug.text-property.ts"
import type { SetLogDate } from "./properties/set-log-date.calendar-date-property.types.ts"
import type { SetNumber } from "./properties/set-number.number-property.types.ts"
import type { SetVolume } from "./properties/set-volume.computed-property.ts"
import type { Weight } from "./properties/weight.number-property.types.ts"

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
