import type { Page } from "../../../../../pages/page.page-type.types.ts"
import type { Title } from "../../../../../pages/properties/title.text-property.ts"
import type { Equipment } from "./properties/equipment.select-property.ts"
import type { ExerciseCategory } from "./properties/exercise-category.select-property.ts"
import type { ExerciseExternalId } from "./properties/exercise-external-id.text-property.ts"
import type { ExerciseExternalLink } from "./properties/exercise-external-link.url-property.ts"
import type { ExerciseLastSyncedAt } from "./properties/exercise-last-synced-at.calendar-date-property.ts"
import type { ExerciseLevel } from "./properties/exercise-level.select-property.ts"
import type { ExerciseSource } from "./properties/exercise-source.select-property.ts"
import type { Force } from "./properties/force.select-property.ts"
import type { GripDemand } from "./properties/grip-demand.select-property.ts"
import type { ImageEndUrl } from "./properties/image-end-url.url-property.ts"
import type { ImageStartUrl } from "./properties/image-start-url.url-property.ts"
import type { ImplementCount } from "./properties/implement-count.number-property.ts"
import type { Instructions } from "./properties/instructions.file-property.ts"
import type { IsBallistic } from "./properties/is-ballistic.boolean-property.ts"
import type { Laterality } from "./properties/laterality.select-property.ts"
import type { LoadFactor } from "./properties/load-factor.number-property.ts"
import type { Mechanic } from "./properties/mechanic.select-property.ts"
import type { MovementPattern } from "./properties/movement-pattern.select-property.ts"
import type { MuscleFocus } from "./properties/muscle-focus.select-property.ts"
import type { PrimaryMuscles } from "./properties/primary-muscles.select-property.ts"
import type { ScoringMode } from "./properties/scoring-mode.select-property.ts"
import type { SecondaryMuscles } from "./properties/secondary-muscles.select-property.ts"
import type { SecondaryPattern } from "./properties/secondary-pattern.select-property.ts"
import type { SfrScore } from "./properties/sfr-score.number-property.ts"
import type { SkillCost } from "./properties/skill-cost.select-property.ts"
import type { TrainsLengthenedRange } from "./properties/trains-lengthened-range.boolean-property.ts"

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
