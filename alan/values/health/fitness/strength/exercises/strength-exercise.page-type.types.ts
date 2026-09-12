import type { Equipment } from "akasha/alan/values/health/fitness/strength/exercises/properties/equipment.relation-property.types.ts"
import type { ExerciseCategory } from "akasha/alan/values/health/fitness/strength/exercises/properties/exercise-category.select-property.types.ts"
import type { ExerciseExternalId } from "akasha/alan/values/health/fitness/strength/exercises/properties/exercise-external-id.text-property.types.ts"
import type { ExerciseExternalLink } from "akasha/alan/values/health/fitness/strength/exercises/properties/exercise-external-link.url-property.types.ts"
import type { ExerciseLastSyncedAt } from "akasha/alan/values/health/fitness/strength/exercises/properties/exercise-last-synced-at.calendar-date-property.types.ts"
import type { ExerciseLevel } from "akasha/alan/values/health/fitness/strength/exercises/properties/exercise-level.select-property.types.ts"
import type { ExerciseSource } from "akasha/alan/values/health/fitness/strength/exercises/properties/exercise-source.select-property.types.ts"
import type { Force } from "akasha/alan/values/health/fitness/strength/exercises/properties/force.select-property.types.ts"
import type { GripDemand } from "akasha/alan/values/health/fitness/strength/exercises/properties/grip-demand.select-property.types.ts"
import type { ImageEndUrl } from "akasha/alan/values/health/fitness/strength/exercises/properties/image-end-url.url-property.types.ts"
import type { ImageStartUrl } from "akasha/alan/values/health/fitness/strength/exercises/properties/image-start-url.url-property.types.ts"
import type { ImplementCount } from "akasha/alan/values/health/fitness/strength/exercises/properties/implement-count.number-property.types.ts"
import type { Instructions } from "akasha/alan/values/health/fitness/strength/exercises/properties/instructions.file-property.types.ts"
import type { IsBallistic } from "akasha/alan/values/health/fitness/strength/exercises/properties/is-ballistic.boolean-property.types.ts"
import type { Laterality } from "akasha/alan/values/health/fitness/strength/exercises/properties/laterality.select-property.types.ts"
import type { LoadFactor } from "akasha/alan/values/health/fitness/strength/exercises/properties/load-factor.number-property.types.ts"
import type { Mechanic } from "akasha/alan/values/health/fitness/strength/exercises/properties/mechanic.select-property.types.ts"
import type { MovementPattern } from "akasha/alan/values/health/fitness/strength/exercises/properties/movement-pattern.select-property.types.ts"
import type { MuscleFocus } from "akasha/alan/values/health/fitness/strength/exercises/properties/muscle-focus.select-property.types.ts"
import type { PrimaryMuscles } from "akasha/alan/values/health/fitness/strength/exercises/properties/primary-muscles.select-property.types.ts"
import type { ScoringMode } from "akasha/alan/values/health/fitness/strength/exercises/properties/scoring-mode.select-property.types.ts"
import type { SecondaryMuscles } from "akasha/alan/values/health/fitness/strength/exercises/properties/secondary-muscles.select-property.types.ts"
import type { SecondaryPattern } from "akasha/alan/values/health/fitness/strength/exercises/properties/secondary-pattern.select-property.types.ts"
import type { SfrScore } from "akasha/alan/values/health/fitness/strength/exercises/properties/sfr-score.number-property.types.ts"
import type { SkillCost } from "akasha/alan/values/health/fitness/strength/exercises/properties/skill-cost.select-property.types.ts"
import type { TrainsLengthenedRange } from "akasha/alan/values/health/fitness/strength/exercises/properties/trains-lengthened-range.boolean-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

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
}
