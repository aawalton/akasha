import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const strengthExerciseImplement = {
  id: "01a09412-00c5-7bbd-ba9c-61f0608a646c",
  type: "page-type/page-type",
  slug: "strength-exercise-implement",
  definition: "a class of kit a movement is loaded with",
  extends: ["page-type/domain"],
  parts: [
    "strength-exercise-implement/bands",
    "strength-exercise-implement/barbell",
    "strength-exercise-implement/body-only",
    "strength-exercise-implement/cable",
    "strength-exercise-implement/dumbbell",
    "strength-exercise-implement/e-z-curl-bar",
    "strength-exercise-implement/exercise-ball",
    "strength-exercise-implement/foam-roll",
    "strength-exercise-implement/gripper",
    "strength-exercise-implement/kettlebells",
    "strength-exercise-implement/machine",
    "strength-exercise-implement/medicine-ball",
    "strength-exercise-implement/other",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement names one of these rather than naming a piece Alan owns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece Alan owns names the ones that piece answers for.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
