import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const freeRelativePronounWithATimeAdverbPastTenseAndAPrepositionPhraseClause = {
  id: "01a18dc5-91bf-7c79-aaab-284963c538b7",
  type: "page-type/construction",
  slug: "free-relative-pronoun-with-a-time-adverb-past-tense-and-a-preposition-phrase-clause",
  definition: "a noun phrase saying when or where a proper noun did a thing, with a time adverb",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/free-relative-pronoun",
    "part-of-speech/proper-noun",
    "part-of-speech/time-adverb",
    "part-of-speech/past-tense",
    "phrase-kind/preposition-phrase",
  ],
  admits: ["when Alan last wrote to a persona"],
  refuses: ["when Alan wrote last to a persona", "when last Alan wrote to a persona"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The time adverb says which of the times the proper noun did it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A preposition phrase follows the past tense, and no object does.",
    },
  ],
  createdAt: "2026-10-30T17:04:57.788Z",
  updatedAt: "2026-10-30T17:04:57.788Z",
} as const satisfies Construction
