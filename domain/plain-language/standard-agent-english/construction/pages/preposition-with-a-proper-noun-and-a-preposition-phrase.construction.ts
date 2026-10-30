import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const prepositionWithAProperNounAndAPrepositionPhrase = {
  id: "01a18d97-a2af-77ef-b76f-acbaa940f75a",
  type: "page-type/construction",
  slug: "preposition-with-a-proper-noun-and-a-preposition-phrase",
  definition:
    "a preposition phrase written from a preposition, a proper noun and a second preposition phrase",
  phraseKind: "phrase-kind/preposition-phrase",
  writtenFrom: [
    "part-of-speech/preposition",
    "part-of-speech/proper-noun",
    "part-of-speech/preposition",
    "phrase-kind/noun-phrase",
  ],
  admits: ["the time in New York at an instant", "a time that is behind UTC at an instant"],
  refuses: ["machine in a cluster of servers", "the time in New York at"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A proper noun takes no preposition phrase, so the second phrase reads one way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second phrase a conjunction joins would read two ways, so it is not written.",
    },
  ],
  createdAt: "2026-10-30T16:14:47.468Z",
  updatedAt: "2026-10-30T16:14:47.468Z",
} as const satisfies Construction
