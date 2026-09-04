import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
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
  extendsSlug: "page-type/page",
  partSlugs: [
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
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "exercise-category", required: true, many: false },
    { pagePropertySlug: "equipment", required: false, many: false },
    { pagePropertySlug: "exercise-external-id", required: false, many: false },
    { pagePropertySlug: "exercise-external-link", required: false, many: false },
    { pagePropertySlug: "force", required: false, many: false },
    { pagePropertySlug: "grip-demand", required: true, many: false },
    { pagePropertySlug: "image-end-url", required: false, many: false },
    { pagePropertySlug: "image-start-url", required: false, many: false },
    { pagePropertySlug: "implement-count", required: true, many: false },
    { pagePropertySlug: "is-ballistic", required: true, many: false },
    { pagePropertySlug: "exercise-last-synced-at", required: false, many: false },
    { pagePropertySlug: "laterality", required: true, many: false },
    { pagePropertySlug: "exercise-level", required: true, many: false },
    { pagePropertySlug: "load-factor", required: true, many: false },
    { pagePropertySlug: "mechanic", required: false, many: false },
    { pagePropertySlug: "movement-pattern", required: true, many: false },
    { pagePropertySlug: "muscle-focus", required: true, many: false },
    { pagePropertySlug: "primary-muscles", required: true, many: true, max: null },
    { pagePropertySlug: "scoring-mode", required: true, many: false },
    { pagePropertySlug: "secondary-muscles", required: false, many: true, max: null },
    { pagePropertySlug: "secondary-pattern", required: false, many: false },
    { pagePropertySlug: "sfr-score", required: true, many: false },
    { pagePropertySlug: "skill-cost", required: true, many: false },
    { pagePropertySlug: "exercise-source", required: true, many: false },
    { pagePropertySlug: "trains-lengthened-range", required: true, many: false },
    { pagePropertySlug: "instructions", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "How a movement is performed stands in its own file rather than in a value beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A movement carrying an external id was imported and is refreshed from its source.",
    },
    {
      invariantKind: "departure",
      statement: "A movement Alan wrote himself carries no external id, link, image or sync day.",
    },
  ],
} as const satisfies PageType
