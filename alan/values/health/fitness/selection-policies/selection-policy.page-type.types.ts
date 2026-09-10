import type { Page } from "../../../../../pages/page.page-type.types.ts"
import type { AnchorBlockWeeks } from "./properties/anchor-block-weeks.number-property.types.ts"
import type { AnchorEscapeRpeCeiling } from "./properties/anchor-escape-rpe-ceiling.number-property.types.ts"
import type { LayoffGraceDays } from "./properties/layoff-grace-days.number-property.types.ts"
import type { LayoffMaxLoadReduction } from "./properties/layoff-max-load-reduction.number-property.types.ts"
import type { LayoffSaturationDays } from "./properties/layoff-saturation-days.number-property.types.ts"
import type { NoveltyCapPerSession } from "./properties/novelty-cap-per-session.number-property.types.ts"
import type { RecencySaturationDays } from "./properties/recency-saturation-days.number-property.types.ts"
import type { RecencyWeight } from "./properties/recency-weight.number-property.types.ts"
import type { WeeklySetCeiling } from "./properties/weekly-set-ceiling.number-property.types.ts"
import type { WeeklySetFloor } from "./properties/weekly-set-floor.number-property.types.ts"
import type { WeightAesthetics } from "./properties/weight-aesthetics.number-property.types.ts"
import type { WeightEnergy } from "./properties/weight-energy.number-property.types.ts"
import type { WeightFunctionality } from "./properties/weight-functionality.number-property.types.ts"
import type { WeightLongevity } from "./properties/weight-longevity.number-property.types.ts"
import type { Zone2WeeklyFloor } from "./properties/zone2-weekly-floor.number-property.types.ts"

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
