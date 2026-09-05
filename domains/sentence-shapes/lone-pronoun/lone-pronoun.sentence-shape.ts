import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const lonePronoun = {
  id: "01a05da1-d93d-795d-bf61-a2b20da998b7",
  pageTypeSlug: "sentence-shape",
  slug: "lone-pronoun",
  definition: "a pronoun used where a noun would be",
  allowed: false,
  code: "ts",
  test: "ts",
  reason: "Resolving a pronoun costs a reader a step that naming the thing does not.",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An indefinite pronoun points at no thing, so no noun takes its place.",
    },
    {
      invariantKind: "departure",
      statement:
        "A free relative is a lone pronoun, because naming the thing a clause holds costs less.",
    },
  ],
} as const satisfies SentenceShape
