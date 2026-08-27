import type { Json } from "../pages/page"
import { classificationOverrideFor } from "./classification-overrides"
import { implementCountForExercise, loadFactorForExercise } from "./load-model"
import type { FreeExercise } from "./schemas"
import { deriveSelectionFeatures, selectionFeatureProps } from "./selection-features"

const IMAGE_BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/"
const EXTERNAL_LINK_BASE = "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/"

export function slugifyOptionId(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

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
}): Record<string, Json> {
  const { exercise } = args
  const imageStart = exercise.images[0]
  const imageEnd = exercise.images[1]

  const ov = classificationOverrideFor(exercise.id)
  const category = ov?.category ?? exercise.category
  const force = ov?.force ?? exercise.force
  const mechanic = ov?.mechanic ?? exercise.mechanic
  const equipment = ov?.equipment ?? exercise.equipment
  const primaryMuscles = ov?.primaryMuscles ?? exercise.primaryMuscles
  const secondaryMuscles = ov?.secondaryMuscles ?? exercise.secondaryMuscles

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
    level: slugifyOptionId(exercise.level),
    category: slugifyOptionId(category),
    ...(force != null ? { force: slugifyOptionId(force) } : {}),
    ...(mechanic != null ? { mechanic: slugifyOptionId(mechanic) } : {}),
    ...(equipment != null ? { equipment: slugifyOptionId(equipment) } : {}),
    primaryMuscles: primaryMuscles.map(slugifyOptionId),
    secondaryMuscles: secondaryMuscles.map(slugifyOptionId),
    instructions: instructionsToMarkdown(exercise.instructions),
    ...(imageStart != null ? { imageStartUrl: exerciseImageUrl(imageStart) } : {}),
    ...(imageEnd != null ? { imageEndUrl: exerciseImageUrl(imageEnd) } : {}),
    implementCount: implementCountForExercise(exercise),
    loadFactor: loadFactorForExercise(exercise),
    ...selectionFeatureProps(features),
    lastSyncedAt: args.today,
  }
}
