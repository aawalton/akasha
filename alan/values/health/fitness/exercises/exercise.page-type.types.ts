import type { Page } from "../../../../../pages/page.page-type.types.ts"
import type { Title } from "../../../../../pages/properties/title.text-property.ts"
import type { Equipment } from "./properties/equipment.select-property.types.ts"
import type { ExerciseCategory } from "./properties/exercise-category.select-property.types.ts"
import type { ExerciseExternalId } from "./properties/exercise-external-id.text-property.ts"
import type { ExerciseExternalLink } from "./properties/exercise-external-link.url-property.types.ts"
import type { ExerciseLastSyncedAt } from "./properties/exercise-last-synced-at.calendar-date-property.types.ts"
import type { ExerciseLevel } from "./properties/exercise-level.select-property.types.ts"
import type { ExerciseSource } from "./properties/exercise-source.select-property.types.ts"
import type { Force } from "./properties/force.select-property.types.ts"
import type { GripDemand } from "./properties/grip-demand.select-property.types.ts"
import type { ImageEndUrl } from "./properties/image-end-url.url-property.types.ts"
import type { ImageStartUrl } from "./properties/image-start-url.url-property.types.ts"
import type { ImplementCount } from "./properties/implement-count.number-property.types.ts"
import type { Instructions } from "./properties/instructions.file-property.ts"
import type { IsBallistic } from "./properties/is-ballistic.boolean-property.types.ts"
import type { Laterality } from "./properties/laterality.select-property.types.ts"
import type { LoadFactor } from "./properties/load-factor.number-property.types.ts"
import type { Mechanic } from "./properties/mechanic.select-property.types.ts"
import type { MovementPattern } from "./properties/movement-pattern.select-property.types.ts"
import type { MuscleFocus } from "./properties/muscle-focus.select-property.types.ts"
import type { PrimaryMuscles } from "./properties/primary-muscles.select-property.types.ts"
import type { ScoringMode } from "./properties/scoring-mode.select-property.types.ts"
import type { SecondaryMuscles } from "./properties/secondary-muscles.select-property.types.ts"
import type { SecondaryPattern } from "./properties/secondary-pattern.select-property.types.ts"
import type { SfrScore } from "./properties/sfr-score.number-property.types.ts"
import type { SkillCost } from "./properties/skill-cost.select-property.types.ts"
import type { TrainsLengthenedRange } from "./properties/trains-lengthened-range.boolean-property.types.ts"

export type Exercise = Page & {
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
