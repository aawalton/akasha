import type { Day } from "./day.page-type.ts"
import type { ActivityCalories } from "./properties/activity-calories.computed-property.ts"
import type { FaithLevel } from "./properties/faith-level.computed-property.ts"
import type { FaithStoplight } from "./properties/faith-stoplight.computed-property.ts"
import type { FunLevel } from "./properties/fun-level.computed-property.ts"
import type { FunStoplight } from "./properties/fun-stoplight.computed-property.ts"
import type { HealthLevel } from "./properties/health-level.computed-property.ts"
import type { HealthStoplight } from "./properties/health-stoplight.computed-property.ts"
import type { LearnLevel } from "./properties/learn-level.computed-property.ts"
import type { LearnStoplight } from "./properties/learn-stoplight.computed-property.ts"
import type { LoveLevel } from "./properties/love-level.computed-property.ts"
import type { LoveStoplight } from "./properties/love-stoplight.computed-property.ts"
import type { ProjectHours } from "./properties/project-hours.computed-property.ts"
import type { WorkedSessions } from "./properties/sessions.page-property-entry.ts"
import type { SleepHours } from "./properties/sleep-hours.computed-property.ts"
import type { SpendHours } from "./properties/spend-hours.computed-property.ts"
import type { Stoplights } from "./properties/stoplights.computed-property.ts"
import type { StrengthCalories } from "./properties/strength-calories.computed-property.ts"
import type { StrengthVolume } from "./properties/strength-volume.computed-property.ts"
import type { SurplusHours } from "./properties/surplus-hours.computed-property.ts"
import type { TotalLevel } from "./properties/total-level.computed-property.ts"
import type { WealthLevel } from "./properties/wealth-level.computed-property.ts"
import type { WealthStoplight } from "./properties/wealth-stoplight.computed-property.ts"

export type WorkedDay = Omit<Day, "sessions"> & {
  sessions?: WorkedSessions
  activityCalories?: ActivityCalories
  strengthCalories?: StrengthCalories
  strengthVolume?: StrengthVolume
  faithLevel?: FaithLevel
  loveLevel?: LoveLevel
  healthLevel?: HealthLevel
  learnLevel?: LearnLevel
  funLevel?: FunLevel
  wealthLevel?: WealthLevel
  totalLevel?: TotalLevel
  faithStoplight?: FaithStoplight
  loveStoplight?: LoveStoplight
  healthStoplight?: HealthStoplight
  learnStoplight?: LearnStoplight
  funStoplight?: FunStoplight
  wealthStoplight?: WealthStoplight
  stoplights?: Stoplights
  projectHours?: ProjectHours
  sleepHours?: SleepHours
  spendHours?: SpendHours
  surplusHours?: SurplusHours
}
