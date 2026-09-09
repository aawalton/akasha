import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
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
  primaryMuscles: readonly PrimaryMuscles[]
  scoringMode: ScoringMode
  secondaryMuscles?: readonly SecondaryMuscles[]
  secondaryPattern?: SecondaryPattern
  sfrScore: SfrScore
  skillCost: SkillCost
  exerciseSource: ExerciseSource
  trainsLengthenedRange: TrainsLengthenedRange
  instructions?: Instructions
}

export const exercise = {
  id: "01a0657e-2bbf-7c1f-a05c-77af77f54cbf",
  pageTypeSlug: "page-type",
  slug: "exercise",
  definition: "one movement Alan can be programmed to perform",
  pluralSlug: "exercises",
  extends: ["page-type/page"],
  parts: [
    "boolean-property/is-ballistic",
    "boolean-property/trains-lengthened-range",
    "calendar-date-property/exercise-last-synced-at",
    "file-property/instructions",
    "number-property/implement-count",
    "number-property/load-factor",
    "number-property/sfr-score",
    "select-property/equipment",
    "select-property/exercise-category",
    "select-property/exercise-level",
    "select-property/exercise-source",
    "select-property/force",
    "select-property/grip-demand",
    "select-property/laterality",
    "select-property/mechanic",
    "select-property/movement-pattern",
    "select-property/muscle-focus",
    "select-property/primary-muscles",
    "select-property/scoring-mode",
    "select-property/secondary-muscles",
    "select-property/secondary-pattern",
    "select-property/skill-cost",
    "text-property/exercise-external-id",
    "url-property/exercise-external-link",
    "url-property/image-end-url",
    "url-property/image-start-url",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "select-property/exercise-category", required: true, many: false },
    { pagePropertySlug: "select-property/equipment", required: false, many: false },
    { pagePropertySlug: "text-property/exercise-external-id", required: false, many: false },
    { pagePropertySlug: "url-property/exercise-external-link", required: false, many: false },
    { pagePropertySlug: "select-property/force", required: false, many: false },
    { pagePropertySlug: "select-property/grip-demand", required: true, many: false },
    { pagePropertySlug: "url-property/image-end-url", required: false, many: false },
    { pagePropertySlug: "url-property/image-start-url", required: false, many: false },
    { pagePropertySlug: "number-property/implement-count", required: true, many: false },
    { pagePropertySlug: "boolean-property/is-ballistic", required: true, many: false },
    {
      pagePropertySlug: "calendar-date-property/exercise-last-synced-at",
      required: false,
      many: false,
    },
    { pagePropertySlug: "select-property/laterality", required: true, many: false },
    { pagePropertySlug: "select-property/exercise-level", required: true, many: false },
    { pagePropertySlug: "number-property/load-factor", required: true, many: false },
    { pagePropertySlug: "select-property/mechanic", required: false, many: false },
    { pagePropertySlug: "select-property/movement-pattern", required: true, many: false },
    { pagePropertySlug: "select-property/muscle-focus", required: true, many: false },
    {
      pagePropertySlug: "select-property/primary-muscles",
      required: true,
      many: true,
      maxCount: null,
    },
    { pagePropertySlug: "select-property/scoring-mode", required: true, many: false },
    {
      pagePropertySlug: "select-property/secondary-muscles",
      required: false,
      many: true,
      maxCount: null,
    },
    { pagePropertySlug: "select-property/secondary-pattern", required: false, many: false },
    { pagePropertySlug: "number-property/sfr-score", required: true, many: false },
    { pagePropertySlug: "select-property/skill-cost", required: true, many: false },
    { pagePropertySlug: "select-property/exercise-source", required: true, many: false },
    { pagePropertySlug: "boolean-property/trains-lengthened-range", required: true, many: false },
    { pagePropertySlug: "file-property/instructions", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "How a movement is performed is in its own file rather than in a value beside that movement.",
    },
    {
      invariantKind: "departure",
      statement: "A movement with an external id was imported and is refreshed from its source.",
    },
    {
      invariantKind: "departure",
      statement: "A movement Alan wrote himself has no field an external source would fill.",
    },
  ],
} as const satisfies PageType
