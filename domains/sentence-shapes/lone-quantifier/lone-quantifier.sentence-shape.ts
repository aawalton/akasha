import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const loneQuantifier = {
  id: "01a05dbf-e1d8-7c53-8118-ff93ef6f72a0",
  pageTypeSlug: "sentence-shape",
  slug: "lone-quantifier",
  definition: "a quantifier used where a noun would be",
  allowed: false,
  code: "ts",
  test: "ts",
  reason: "A quantifier makes a reader find what it counts where naming it does not.",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A word inside backticks is a name rather than a quantifier.",
    },
    {
      invariantKind: "departure",
      statement: "A quantifier determining a backticked name is passed over.",
    },
  ],
} as const satisfies SentenceShape
