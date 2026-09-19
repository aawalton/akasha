import type { Equipment } from "akasha/alan/value/health/fitness/strength/exercise/properties/equipment.relation-property.types.ts"
import type { ExerciseCategory } from "akasha/alan/value/health/fitness/strength/exercise/properties/exercise-category.select-property.types.ts"
import type { ExerciseExternalId } from "akasha/alan/value/health/fitness/strength/exercise/properties/exercise-external-id.text-property.types.ts"
import type { ExerciseExternalLink } from "akasha/alan/value/health/fitness/strength/exercise/properties/exercise-external-link.url-property.types.ts"
import type { ExerciseLastSyncedAt } from "akasha/alan/value/health/fitness/strength/exercise/properties/exercise-last-synced-at.calendar-date-property.types.ts"
import type { ExerciseLevel } from "akasha/alan/value/health/fitness/strength/exercise/properties/exercise-level.select-property.types.ts"
import type { ExerciseSource } from "akasha/alan/value/health/fitness/strength/exercise/properties/exercise-source.select-property.types.ts"
import type { Force } from "akasha/alan/value/health/fitness/strength/exercise/properties/force.select-property.types.ts"
import type { GripDemand } from "akasha/alan/value/health/fitness/strength/exercise/properties/grip-demand.select-property.types.ts"
import type { ImageEndUrl } from "akasha/alan/value/health/fitness/strength/exercise/properties/image-end-url.url-property.types.ts"
import type { ImageStartUrl } from "akasha/alan/value/health/fitness/strength/exercise/properties/image-start-url.url-property.types.ts"
import type { ImplementCount } from "akasha/alan/value/health/fitness/strength/exercise/properties/implement-count.number-property.types.ts"
import type { Instructions } from "akasha/alan/value/health/fitness/strength/exercise/properties/instructions.file-property.types.ts"
import type { IsBallistic } from "akasha/alan/value/health/fitness/strength/exercise/properties/is-ballistic.boolean-property.types.ts"
import type { Laterality } from "akasha/alan/value/health/fitness/strength/exercise/properties/laterality.select-property.types.ts"
import type { LoadFactor } from "akasha/alan/value/health/fitness/strength/exercise/properties/load-factor.number-property.types.ts"
import type { Mechanic } from "akasha/alan/value/health/fitness/strength/exercise/properties/mechanic.select-property.types.ts"
import type { MovementPattern } from "akasha/alan/value/health/fitness/strength/exercise/properties/movement-pattern.select-property.types.ts"
import type { MuscleFocus } from "akasha/alan/value/health/fitness/strength/exercise/properties/muscle-focus.select-property.types.ts"
import type { PrimaryMuscles } from "akasha/alan/value/health/fitness/strength/exercise/properties/primary-muscles.select-property.types.ts"
import type { RaisesCold } from "akasha/alan/value/health/fitness/strength/exercise/properties/raises-cold.boolean-property.types.ts"
import type { ScoringMode } from "akasha/alan/value/health/fitness/strength/exercise/properties/scoring-mode.select-property.types.ts"
import type { SecondaryMuscles } from "akasha/alan/value/health/fitness/strength/exercise/properties/secondary-muscles.select-property.types.ts"
import type { SecondaryPattern } from "akasha/alan/value/health/fitness/strength/exercise/properties/secondary-pattern.select-property.types.ts"
import type { SfrScore } from "akasha/alan/value/health/fitness/strength/exercise/properties/sfr-score.number-property.types.ts"
import type { SkillCost } from "akasha/alan/value/health/fitness/strength/exercise/properties/skill-cost.select-property.types.ts"
import type { TrainsLengthenedRange } from "akasha/alan/value/health/fitness/strength/exercise/properties/trains-lengthened-range.boolean-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type StrengthExercise = Page & {
  title: Title
  exerciseCategory: ExerciseCategory
  equipment?: Equipment
  exerciseExternalId?: ExerciseExternalId
  exerciseExternalLink?: ExerciseExternalLink
  force?: Force
  gripDemand: GripDemand
  imageEndUrl?: ImageEndUrl
  imageStartUrl?: ImageStartUrl
  implementCount: ImplementCount
  isBallistic: IsBallistic
  exerciseLastSyncedAt?: ExerciseLastSyncedAt
  laterality: Laterality
  exerciseLevel: ExerciseLevel
  loadFactor: LoadFactor
  mechanic?: Mechanic
  movementPattern: MovementPattern
  muscleFocus: MuscleFocus
  primaryMuscles: PrimaryMuscles
  scoringMode: ScoringMode
  secondaryMuscles?: SecondaryMuscles
  secondaryPattern?: SecondaryPattern
  sfrScore: SfrScore
  skillCost: SkillCost
  exerciseSource: ExerciseSource
  trainsLengthenedRange: TrainsLengthenedRange
  instructions?: Instructions
  raisesCold?: RaisesCold
}
