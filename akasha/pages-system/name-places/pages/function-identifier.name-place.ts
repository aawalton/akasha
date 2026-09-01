import type { NamePlace } from "../name-place.page-type.ts"

export const functionIdentifier = {
  id: "01a04fc9-2ad7-7c2a-aab9-6def70b88cca",
  pageTypeSlug: "name-place",
  slug: "function-identifier",
  definition: "the name a function carries in code",
  nameFormatSlug: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A function is named for what the function answers rather than for how the answer is worked out.",
    },
  ],
} as const satisfies NamePlace
