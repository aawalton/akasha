import type { LegsVolumeLimitFactor } from "akasha/alan/value/health/fitness/selection-policy/properties/legs-volume-limit-factor.number-property.types.ts"
import type { NearFailureRpeFloor } from "akasha/alan/value/health/fitness/selection-policy/properties/near-failure-rpe-floor.number-property.types.ts"
import type { SecondsHoldingStretch } from "akasha/alan/value/health/fitness/selection-policy/properties/seconds-holding-stretch.number-property.types.ts"
import type { StretchesCoolingDown } from "akasha/alan/value/health/fitness/selection-policy/properties/stretches-cooling-down.number-property.types.ts"
import type { VolumeLimitFall } from "akasha/alan/value/health/fitness/selection-policy/properties/volume-limit-fall.number-property.types.ts"
import type { VolumeLimitFrom } from "akasha/alan/value/health/fitness/selection-policy/properties/volume-limit-from.calendar-date-property.types.ts"
import type { VolumeLimitRise } from "akasha/alan/value/health/fitness/selection-policy/properties/volume-limit-rise.number-property.types.ts"
import type { VolumeLimitSeed } from "akasha/alan/value/health/fitness/selection-policy/properties/volume-limit-seed.number-property.types.ts"
import type { WeeklySetCeiling } from "akasha/alan/value/health/fitness/selection-policy/properties/weekly-set-ceiling.number-property.types.ts"
import type { WeeklySetFloor } from "akasha/alan/value/health/fitness/selection-policy/properties/weekly-set-floor.number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type SelectionPolicy = Page & {
  weeklySetFloor: WeeklySetFloor
  weeklySetCeiling: WeeklySetCeiling
  nearFailureRpeFloor: NearFailureRpeFloor
  stretchesCoolingDown: StretchesCoolingDown
  secondsHoldingStretch: SecondsHoldingStretch
  volumeLimitSeed: VolumeLimitSeed
  volumeLimitRise: VolumeLimitRise
  volumeLimitFall: VolumeLimitFall
  volumeLimitFrom: VolumeLimitFrom
  legsVolumeLimitFactor: LegsVolumeLimitFactor
}
