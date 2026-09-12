import type { StrengthExerciseSelectionConstraint } from "akasha/alan/values/health/fitness/strength/exercises/selection/constraints/strength-exercise-selection-constraint.page-type.types.ts"

export const bilateralHinge = {
  id: "01a0932b-b817-7fdb-a234-bf9ae41bdfe3",
  type: "strength-exercise-selection-constraint",
  slug: "bilateral-hinge",
  definition: "keeps out a movement hinging at the hip with both legs at once",
  testedAgainOn: "2026-12-11",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Alan's low back rather than his hamstrings ends a hinge on both legs.",
    },
    {
      invariantKind: "departure",
      statement: "A hinge on one leg is left in.",
    },
  ],
} as const satisfies StrengthExerciseSelectionConstraint
