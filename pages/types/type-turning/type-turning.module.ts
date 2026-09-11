import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const typeTurning = {
  id: "01a090e0-64d6-702b-9c2e-819482b42178",
  type: "module",
  slug: "type-turning",
  definition: "whether a change could turn the type written beside a page",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A generator stating this answers here rather than in the code running it.",
    },
    {
      invariantKind: "departure",
      statement: "What a change could turn is read from the names of the paths that change has.",
    },
    {
      invariantKind: "departure",
      statement: "A change naming a page type could turn a type.",
    },
    {
      invariantKind: "departure",
      statement: "A change naming a generator or a type file could turn a type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path a generated body imports could turn a type whether the change writes or takes it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which bodies import that path is read from the index before the change rather than the shadow.",
    },
    {
      invariantKind: "departure",
      statement:
        "That reading is taken only where the names of the changed paths answered nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a type or reaches a generator.",
    },
  ],
} as const satisfies Module
