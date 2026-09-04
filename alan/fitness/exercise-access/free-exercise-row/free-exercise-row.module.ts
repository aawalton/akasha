import type { Module } from "@akasha/code-system/module"

export const freeExerciseRow = {
  id: "01a06865-c36f-77f1-a9f3-9f2284e0f4d3",
  pageTypeSlug: "module",
  slug: "free-exercise-row",
  definition: "a row of the upstream free exercise database as this repo reads it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row states an empty list for a muscle, instruction or image it does not name.",
    },
    {
      invariantKind: "departure",
      statement: "A row states its force and its mechanic as nothing rather than leaving them out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A classification the upstream row gets wrong is corrected here under that row's id.",
    },
    {
      invariantKind: "departure",
      statement:
        "A correction is spelled as the upstream database spells a value rather than as a slug.",
    },
  ],
} as const satisfies Module
