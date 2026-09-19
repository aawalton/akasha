import type { BoutsWithoutProgress } from "akasha/alan/value/health/fitness/selection-policy/properties/bouts-without-progress.number-property.types.ts"
import type { MinutesRaising } from "akasha/alan/value/health/fitness/selection-policy/properties/minutes-raising.number-property.types.ts"
import type { MinutesStayingWarm } from "akasha/alan/value/health/fitness/selection-policy/properties/minutes-staying-warm.number-property.types.ts"
import type { MobilisingMovements } from "akasha/alan/value/health/fitness/selection-policy/properties/mobilising-movements.number-property.types.ts"
import type { NearFailureRpeFloor } from "akasha/alan/value/health/fitness/selection-policy/properties/near-failure-rpe-floor.number-property.types.ts"
import type { NoveltyCapPerSession } from "akasha/alan/value/health/fitness/selection-policy/properties/novelty-cap-per-session.number-property.types.ts"
import type { RecencySaturationDays } from "akasha/alan/value/health/fitness/selection-policy/properties/recency-saturation-days.number-property.types.ts"
import type { RecencyWeight } from "akasha/alan/value/health/fitness/selection-policy/properties/recency-weight.number-property.types.ts"
import type { RepsBeforeSlowing } from "akasha/alan/value/health/fitness/selection-policy/properties/reps-before-slowing.number-property.types.ts"
import type { RepsWarmingUp } from "akasha/alan/value/health/fitness/selection-policy/properties/reps-warming-up.number-property.types.ts"
import type { SecondsHoldingStretch } from "akasha/alan/value/health/fitness/selection-policy/properties/seconds-holding-stretch.number-property.types.ts"
import type { SecondsPerRaise } from "akasha/alan/value/health/fitness/selection-policy/properties/seconds-per-raise.number-property.types.ts"
import type { StretchesCoolingDown } from "akasha/alan/value/health/fitness/selection-policy/properties/stretches-cooling-down.number-property.types.ts"
import type { WarmupLoadShare } from "akasha/alan/value/health/fitness/selection-policy/properties/warmup-load-share.number-property.types.ts"
import type { WarmupReps } from "akasha/alan/value/health/fitness/selection-policy/properties/warmup-reps.number-property.types.ts"
import type { WeeklySetCeiling } from "akasha/alan/value/health/fitness/selection-policy/properties/weekly-set-ceiling.number-property.types.ts"
import type { WeeklySetFloor } from "akasha/alan/value/health/fitness/selection-policy/properties/weekly-set-floor.number-property.types.ts"
import type { WeightAesthetics } from "akasha/alan/value/health/fitness/selection-policy/properties/weight-aesthetics.number-property.types.ts"
import type { WeightEnergy } from "akasha/alan/value/health/fitness/selection-policy/properties/weight-energy.number-property.types.ts"
import type { WeightFunctionality } from "akasha/alan/value/health/fitness/selection-policy/properties/weight-functionality.number-property.types.ts"
import type { WeightLongevity } from "akasha/alan/value/health/fitness/selection-policy/properties/weight-longevity.number-property.types.ts"
import type { Zone2WeeklyFloor } from "akasha/alan/value/health/fitness/selection-policy/properties/zone2-weekly-floor.number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type SelectionPolicy = Page & {
  weightLongevity: WeightLongevity
  weightEnergy: WeightEnergy
  weightFunctionality: WeightFunctionality
  weightAesthetics: WeightAesthetics
  noveltyCapPerSession: NoveltyCapPerSession
  weeklySetFloor: WeeklySetFloor
  weeklySetCeiling: WeeklySetCeiling
  zone2WeeklyFloor: Zone2WeeklyFloor
  recencyWeight: RecencyWeight
  recencySaturationDays: RecencySaturationDays
  nearFailureRpeFloor: NearFailureRpeFloor
  boutsWithoutProgress: BoutsWithoutProgress
  repsBeforeSlowing: RepsBeforeSlowing
  warmupLoadShare: WarmupLoadShare
  warmupReps: WarmupReps
  minutesStayingWarm: MinutesStayingWarm
  minutesRaising: MinutesRaising
  mobilisingMovements: MobilisingMovements
  secondsPerRaise: SecondsPerRaise
  repsWarmingUp: RepsWarmingUp
  stretchesCoolingDown: StretchesCoolingDown
  secondsHoldingStretch: SecondsHoldingStretch
}
