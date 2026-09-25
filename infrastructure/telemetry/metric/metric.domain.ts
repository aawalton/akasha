import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const metric = {
  id: "01a0658b-0f02-7858-82a5-11f7915cb90f",
  type: "page-type/domain",
  slug: "metric",
  definition: "a number that code measures over time",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "metric" },
    { partOfSpeech: "part-of-speech/noun", spelling: "metrics" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A metric is kept for months.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A metric comes largely from an instrument rather than from the thing measured.",
    },
  ],
} as const satisfies Domain
