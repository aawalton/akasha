import type { Module } from "@akasha/code-system/module"

export const freeExerciseMapping = {
  id: "01a06865-c36f-750c-be64-815879eb4ac0",
  pageTypeSlug: "module",
  slug: "free-exercise-mapping",
  definition: "the exercise page fields an upstream free exercise row becomes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value spelled with spaces upstream is spelled as a slug on the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A correction stands over what the upstream row says before any trait is worked out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A field the upstream row leaves empty is left off the page rather than set to nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The first image is the movement's start and the second its end.",
    },
    {
      invariantKind: "departure",
      statement: "How a movement is performed is carried as numbered markdown steps.",
    },
  ],
} as const satisfies Module
