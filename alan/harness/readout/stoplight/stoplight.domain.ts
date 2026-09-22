import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const stoplight = {
  id: "01a0655b-9cdc-7c65-845c-0fcbf73b73dc",
  type: "page-type/domain",
  slug: "stoplight",
  definition: "one color saying where a reading is now",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "stoplight" },
    { partOfSpeech: "part-of-speech/noun", spelling: "stoplights" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stoplight has five colors.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The colors from worst to best are black and red and yellow and green and blue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Green is good and blue a stretch beyond green.",
    },
  ],
} as const satisfies Domain
