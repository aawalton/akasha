import type { Module } from "@akasha/code-system/module"

export const customExerciseFeatures = {
  id: "01a06865-c36f-7122-b04f-981b3753a95b",
  pageTypeSlug: "module",
  slug: "custom-exercise-features",
  definition: "the traits a movement Alan wrote himself takes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A movement Alan wrote takes its traits by the same working as an imported one.",
    },
    {
      invariantKind: "departure",
      statement: "A slug Alan states is read back to the spelling the working expects.",
    },
    {
      invariantKind: "departure",
      statement: "A slug the vocabulary does not hold is carried through rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A movement stating no level is worked as a beginner's.",
    },
  ],
} as const satisfies Module
