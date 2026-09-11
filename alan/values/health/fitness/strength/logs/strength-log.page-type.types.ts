import type { ActivityType } from "akasha/alan/values/health/fitness/strength/logs/properties/activity-type.select-property.types.ts"
import type { Day } from "akasha/alan/values/health/fitness/strength/logs/properties/day.relation-property.types.ts"
import type { Distance } from "akasha/alan/values/health/fitness/strength/logs/properties/distance.number-property.types.ts"
import type { DurationSeconds } from "akasha/alan/values/health/fitness/strength/logs/properties/duration-seconds.number-property.types.ts"
import type { Exercise } from "akasha/alan/values/health/fitness/strength/logs/properties/exercise.relation-property.types.ts"
import type { IsWarmup } from "akasha/alan/values/health/fitness/strength/logs/properties/is-warmup.boolean-property.types.ts"
import type { Note } from "akasha/alan/values/health/fitness/strength/logs/properties/note.text-property.types.ts"
import type { Reps } from "akasha/alan/values/health/fitness/strength/logs/properties/reps.number-property.types.ts"
import type { Rpe } from "akasha/alan/values/health/fitness/strength/logs/properties/rpe.number-property.types.ts"
import type { SessionSlug } from "akasha/alan/values/health/fitness/strength/logs/properties/session-slug.text-property.types.ts"
import type { SetLogDate } from "akasha/alan/values/health/fitness/strength/logs/properties/set-log-date.calendar-date-property.types.ts"
import type { SetNumber } from "akasha/alan/values/health/fitness/strength/logs/properties/set-number.number-property.types.ts"
import type { SetVolume } from "akasha/alan/values/health/fitness/strength/logs/properties/set-volume.computed-property.types.ts"
import type { Weight } from "akasha/alan/values/health/fitness/strength/logs/properties/weight.number-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type StrengthLog = Page & {
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
