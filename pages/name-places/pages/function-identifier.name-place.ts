import type { NamePlace } from "akasha/pages/name-places/name-place.page-type.types.ts"

export const functionIdentifier = {
  id: "01a04fc9-2ad7-7c2a-aab9-6def70b88cca",
  type: "name-place",
  slug: "function-identifier",
  definition: "the name a function carries in code",
  nameFormat: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A function is named for its answer rather than for how the answer is worked out.",
    },
  ],
} as const satisfies NamePlace
