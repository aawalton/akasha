export interface ClassificationOverride {
  readonly category?: string
  readonly force?: string
  readonly mechanic?: string
  readonly equipment?: string
  readonly primaryMuscles?: readonly string[]
  readonly secondaryMuscles?: readonly string[]
}

const CLASSIFICATION_OVERRIDES: Readonly<Record<string, ClassificationOverride>> = {
  Crossover_Reverse_Lunge: {
    category: "strength",
    force: "push",
    mechanic: "compound",
    equipment: "body only",
    primaryMuscles: ["quadriceps", "glutes"],
    secondaryMuscles: ["hamstrings", "abductors", "abdominals"],
  },
}

export function classificationOverrideFor(id: string): ClassificationOverride | undefined {
  return CLASSIFICATION_OVERRIDES[id]
}
