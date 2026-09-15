import type { SentenceShape } from "akasha/domain/sentence-shape/sentence-shape.page-type.types.ts"

export const lonePronoun = {
  id: "01a05da1-d93d-795d-bf61-a2b20da998b7",
  type: "sentence-shape",
  slug: "lone-pronoun",
  definition: "a pronoun used where a noun would be",
  allowed: false,
  code: "ts",
  test: "ts",
  reason: "Resolving a pronoun costs a reader a step that naming the thing does not.",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An indefinite pronoun points at no thing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No noun takes the place of an indefinite pronoun.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A free relative is a lone pronoun.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`Whatever` and `whichever` are passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tree shapes `whatever` alike whether that word names a thing or not.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A free relative is a lone pronoun whether the parser tags that word a pronoun or a determiner.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A free relative that determines the next word is passed over.",
    },
  ],
} as const satisfies SentenceShape
