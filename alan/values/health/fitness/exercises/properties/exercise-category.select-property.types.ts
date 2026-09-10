import type { exerciseCategory } from "./exercise-category.select-property.ts"

export type ExerciseCategory = (typeof exerciseCategory.values)[number]
