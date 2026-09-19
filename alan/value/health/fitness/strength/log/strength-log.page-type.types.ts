import type { ActivityType } from "akasha/alan/value/health/fitness/strength/log/properties/activity-type.select-property.types.ts"
import type { Day } from "akasha/alan/value/health/fitness/strength/log/properties/day.relation-property.types.ts"
import type { Distance } from "akasha/alan/value/health/fitness/strength/log/properties/distance.number-property.types.ts"
import type { DurationSeconds } from "akasha/alan/value/health/fitness/strength/log/properties/duration-seconds.number-property.types.ts"
import type { Exercise } from "akasha/alan/value/health/fitness/strength/log/properties/exercise.relation-property.types.ts"
import type { IsWarmup } from "akasha/alan/value/health/fitness/strength/log/properties/is-warmup.boolean-property.types.ts"
import type { Note } from "akasha/alan/value/health/fitness/strength/log/properties/note.text-property.types.ts"
import type { Reps } from "akasha/alan/value/health/fitness/strength/log/properties/reps.number-property.types.ts"
import type { Rpe } from "akasha/alan/value/health/fitness/strength/log/properties/rpe.number-property.types.ts"
import type { SessionSlug } from "akasha/alan/value/health/fitness/strength/log/properties/session-slug.text-property.types.ts"
import type { SetNumber } from "akasha/alan/value/health/fitness/strength/log/properties/set-number.number-property.types.ts"
import type { SetPerformedAt } from "akasha/alan/value/health/fitness/strength/log/properties/set-performed-at.instant-property.types.ts"
import type { SetVolume } from "akasha/alan/value/health/fitness/strength/log/properties/set-volume.computed-property.types.ts"
import type { Weight } from "akasha/alan/value/health/fitness/strength/log/properties/weight.number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

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
  day: Day
  setNumber: SetNumber
  weight?: Weight
  setVolume?: SetVolume
  setPerformedAt?: SetPerformedAt
}
