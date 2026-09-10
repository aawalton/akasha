import type { Page } from "../../../../../pages/page.page-type.types.ts"
import type { AnchorBlockWeeks } from "./properties/anchor-block-weeks.number-property.ts"
import type { AnchorEscapeRpeCeiling } from "./properties/anchor-escape-rpe-ceiling.number-property.ts"
import type { LayoffGraceDays } from "./properties/layoff-grace-days.number-property.ts"
import type { LayoffMaxLoadReduction } from "./properties/layoff-max-load-reduction.number-property.ts"
import type { LayoffSaturationDays } from "./properties/layoff-saturation-days.number-property.ts"
import type { NoveltyCapPerSession } from "./properties/novelty-cap-per-session.number-property.ts"
import type { RecencySaturationDays } from "./properties/recency-saturation-days.number-property.ts"
import type { RecencyWeight } from "./properties/recency-weight.number-property.ts"
import type { WeeklySetCeiling } from "./properties/weekly-set-ceiling.number-property.ts"
import type { WeeklySetFloor } from "./properties/weekly-set-floor.number-property.ts"
import type { WeightAesthetics } from "./properties/weight-aesthetics.number-property.ts"
import type { WeightEnergy } from "./properties/weight-energy.number-property.ts"
import type { WeightFunctionality } from "./properties/weight-functionality.number-property.ts"
import type { WeightLongevity } from "./properties/weight-longevity.number-property.ts"
import type { Zone2WeeklyFloor } from "./properties/zone2-weekly-floor.number-property.ts"

export type SelectionPolicy = Page & {
  weightLongevity: WeightLongevity
  weightEnergy: WeightEnergy
  weightFunctionality: WeightFunctionality
  weightAesthetics: WeightAesthetics
  noveltyCapPerSession: NoveltyCapPerSession
  anchorBlockWeeks: AnchorBlockWeeks
  anchorEscapeRpeCeiling: AnchorEscapeRpeCeiling
  layoffGraceDays: LayoffGraceDays
  layoffMaxLoadReduction: LayoffMaxLoadReduction
  layoffSaturationDays: LayoffSaturationDays
  weeklySetFloor: WeeklySetFloor
  weeklySetCeiling: WeeklySetCeiling
  zone2WeeklyFloor: Zone2WeeklyFloor
  recencyWeight: RecencyWeight
  recencySaturationDays: RecencySaturationDays
}
