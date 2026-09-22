import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAPastParticipleAndAPrepositionPhrase = {
  id: "01a0c96f-bee9-7f1f-8d2c-d4d536dcb41c",
  type: "page-type/construction",
  slug: "noun-run-with-a-past-participle-and-a-preposition-phrase",
  definition: "a noun group written from a noun run, what was done to it, and where that was done",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/past-participle",
    "phrase-kind/preposition-phrase",
  ],
  admits: [
    "markdown drawn for a reader",
    "bytes kept under a key",
    "listings gathered from a store",
  ],
  refuses: ["drawn for a reader", "markdown for a reader drawn"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The preposition phrase belongs to what was done rather than to the noun run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Who did the thing is named here where the phrase opens with `by`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What was done hung on a whole noun group writes some phrases two ways, so it is not written.",
    },
  ],
} as const satisfies Construction
