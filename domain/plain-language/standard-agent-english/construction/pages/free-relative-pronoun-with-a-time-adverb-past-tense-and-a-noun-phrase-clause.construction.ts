import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const freeRelativePronounWithATimeAdverbPastTenseAndANounPhraseClause = {
  id: "01a18dd2-43e8-7649-9707-0556f7b191a3",
  type: "page-type/construction",
  slug: "free-relative-pronoun-with-a-time-adverb-past-tense-and-a-noun-phrase-clause",
  definition: "a noun phrase saying when or where a proper noun did a thing to a noun phrase",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/free-relative-pronoun",
    "part-of-speech/proper-noun",
    "part-of-speech/time-adverb",
    "part-of-speech/past-tense",
    "phrase-kind/noun-phrase",
  ],
  admits: ["where Alan first saw this person"],
  refuses: ["where Alan saw first this person", "where first Alan saw this person"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The time adverb says which of the times the proper noun did it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A past tense takes an object only where a time adverb comes before it.",
    },
  ],
  createdAt: "2026-10-30T17:18:49.823Z",
  updatedAt: "2026-10-30T17:18:49.823Z",
} as const satisfies Construction
