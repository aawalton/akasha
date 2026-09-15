import type { SentenceShape } from "akasha/domain/sentence-shape/sentence-shape.page-type.types.ts"

export const lonePronoun = {
  id: "01a05da1-d93d-795d-bf61-a2b20da998b7",
  type: "page-type/sentence-shape",
  slug: "lone-pronoun",
  definition: "a pronoun used where a noun would be",
  allowed: false,
  code: "ts",
  test: "ts",
  reason: "Resolving a pronoun costs a reader a step that naming the thing does not.",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An indefinite pronoun points at no thing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No noun takes the place of an indefinite pronoun.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A free relative is a lone pronoun.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`Whatever` and `whichever` are passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree shapes `whatever` alike whether that word names a thing or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A free relative is a lone pronoun whether the parser tags that word a pronoun or a determiner.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A free relative that determines the next word is passed over.",
    },
  ],
} as const satisfies SentenceShape
