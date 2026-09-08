import { optionId } from "../exercise-choosing/exercise-choosing.module.code.ts"
import {
  CATEGORY_OPTIONS,
  EQUIPMENT_OPTIONS,
  FORCE_OPTIONS,
  LEVEL_OPTIONS,
  MECHANIC_OPTIONS,
  MUSCLE_OPTIONS,
} from "../exercise-vocabulary/exercise-vocabulary.module.code.ts"
import type { FreeExercise } from "../free-exercise-row/free-exercise-row.module.code.ts"
import {
  deriveSelectionFeatures,
  type SelectionFeatures,
} from "../selection-features/selection-features.module.code.ts"

export interface CustomExerciseInput {
  readonly title: string
  readonly category?: string
  readonly equipment?: string
  readonly force?: string
  readonly level?: string
  readonly mechanic?: string
  readonly primaryMuscles?: readonly string[]
  readonly secondaryMuscles?: readonly string[]
}

function labelIndex(optionLabels: readonly string[]): ReadonlyMap<string, string> {
  return new Map(optionLabels.map((label) => [optionId(label), label]))
}

const LABELS_BY_SLUG = {
  category: labelIndex(CATEGORY_OPTIONS),
  equipment: labelIndex(EQUIPMENT_OPTIONS),
  force: labelIndex(FORCE_OPTIONS),
  level: labelIndex(LEVEL_OPTIONS),
  mechanic: labelIndex(MECHANIC_OPTIONS),
  muscle: labelIndex(MUSCLE_OPTIONS),
} as const

function labelFor(slug: string | undefined, vocabulary: keyof typeof LABELS_BY_SLUG): string {
  if (slug === undefined) return ""
  return LABELS_BY_SLUG[vocabulary].get(slug) ?? slug
}

function labelsFor(slugs: readonly string[] | undefined): readonly string[] {
  return (slugs ?? []).map((slug) => labelFor(slug, "muscle"))
}

export function deriveCustomExerciseFeatures(input: CustomExerciseInput): SelectionFeatures {
  const level = labelFor(input.level, "level")
  const exercise: FreeExercise = {
    id: "",
    name: input.title,
    force: input.force !== undefined ? labelFor(input.force, "force") : null,
    level: level !== "" ? level : "beginner",
    mechanic: input.mechanic !== undefined ? labelFor(input.mechanic, "mechanic") : null,
    equipment: input.equipment !== undefined ? labelFor(input.equipment, "equipment") : null,
    primaryMuscles: [...labelsFor(input.primaryMuscles)],
    secondaryMuscles: [...labelsFor(input.secondaryMuscles)],
    instructions: [],
    category: labelFor(input.category, "category"),
    images: [],
  }
  return deriveSelectionFeatures(exercise)
}
