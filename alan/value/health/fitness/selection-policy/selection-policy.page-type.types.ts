import type { NearFailureRpeFloor } from "akasha/alan/value/health/fitness/selection-policy/properties/near-failure-rpe-floor.number-property.types.ts"
import type { SecondsHoldingStretch } from "akasha/alan/value/health/fitness/selection-policy/properties/seconds-holding-stretch.number-property.types.ts"
import type { StretchesCoolingDown } from "akasha/alan/value/health/fitness/selection-policy/properties/stretches-cooling-down.number-property.types.ts"
import type { VolumeTargetFall } from "akasha/alan/value/health/fitness/selection-policy/properties/volume-target-fall.number-property.types.ts"
import type { VolumeTargetFrom } from "akasha/alan/value/health/fitness/selection-policy/properties/volume-target-from.calendar-date-property.types.ts"
import type { VolumeTargetRise } from "akasha/alan/value/health/fitness/selection-policy/properties/volume-target-rise.number-property.types.ts"
import type { VolumeTargetSeed } from "akasha/alan/value/health/fitness/selection-policy/properties/volume-target-seed.number-property.types.ts"
import type { WeeklySetCeiling } from "akasha/alan/value/health/fitness/selection-policy/properties/weekly-set-ceiling.number-property.types.ts"
import type { WeeklySetFloor } from "akasha/alan/value/health/fitness/selection-policy/properties/weekly-set-floor.number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type SelectionPolicy = Page & {
  weeklySetFloor: WeeklySetFloor
  weeklySetCeiling: WeeklySetCeiling
  nearFailureRpeFloor: NearFailureRpeFloor
  stretchesCoolingDown: StretchesCoolingDown
  secondsHoldingStretch: SecondsHoldingStretch
  volumeTargetSeed: VolumeTargetSeed
  volumeTargetRise: VolumeTargetRise
  volumeTargetFall: VolumeTargetFall
  volumeTargetFrom: VolumeTargetFrom
}
