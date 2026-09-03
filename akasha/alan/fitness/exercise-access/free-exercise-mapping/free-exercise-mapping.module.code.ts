import { optionId } from "../exercise-choosing/exercise-choosing.module.code.ts"
import {
  implementCountForExercise,
  loadFactorForExercise,
} from "../exercise-load-model/exercise-load-model.module.code.ts"
import type { Value } from "../exercise-rows/exercise-rows.module.code.ts"
import {
  classificationOverrideFor,
  type FreeExercise,
} from "../free-exercise-row/free-exercise-row.module.code.ts"
import {
  deriveSelectionFeatures,
  selectionFeatureProps,
} from "../selection-features/selection-features.module.code.ts"

const IMAGE_BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/"
const EXTERNAL_LINK_BASE = "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/"

export function exerciseExternalLink(id: string): string {
  return `${EXTERNAL_LINK_BASE}${id}`
}

export function exerciseImageUrl(relativePath: string): string {
  return `${IMAGE_BASE}${relativePath}`
}

export function instructionsToMarkdown(instructions: readonly string[]): string {
  return instructions.map((step, i) => `${i + 1}. ${step}`).join("\n")
}

export function exerciseToProps(args: {
  readonly exercise: FreeExercise
  readonly today: string
}): Record<string, Value> {
  const { exercise } = args
  const imageStart = exercise.images[0]
  const imageEnd = exercise.images[1]

  const corrected = classificationOverrideFor(exercise.id)
  const category = corrected?.category ?? exercise.category
  const force = corrected?.force ?? exercise.force
  const mechanic = corrected?.mechanic ?? exercise.mechanic
  const equipment = corrected?.equipment ?? exercise.equipment
  const primaryMuscles = corrected?.primaryMuscles ?? exercise.primaryMuscles
  const secondaryMuscles = corrected?.secondaryMuscles ?? exercise.secondaryMuscles

  const features = deriveSelectionFeatures({
    ...exercise,
    category,
    force,
    mechanic,
    equipment,
    primaryMuscles: [...primaryMuscles],
    secondaryMuscles: [...secondaryMuscles],
  })

  return {
    title: exercise.name,
    externalId: exercise.id,
    externalLink: exerciseExternalLink(exercise.id),
    source: "free-exercise-db",
    level: optionId(exercise.level),
    category: optionId(category),
    ...(force != null ? { force: optionId(force) } : {}),
    ...(mechanic != null ? { mechanic: optionId(mechanic) } : {}),
    ...(equipment != null ? { equipment: optionId(equipment) } : {}),
    primaryMuscles: primaryMuscles.map(optionId),
    secondaryMuscles: secondaryMuscles.map(optionId),
    instructions: instructionsToMarkdown(exercise.instructions),
    ...(imageStart != null ? { imageStartUrl: exerciseImageUrl(imageStart) } : {}),
    ...(imageEnd != null ? { imageEndUrl: exerciseImageUrl(imageEnd) } : {}),
    implementCount: implementCountForExercise(exercise),
    loadFactor: loadFactorForExercise(exercise),
    ...selectionFeatureProps(features),
    lastSyncedAt: args.today,
  }
}
