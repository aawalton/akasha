import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const verbWithAMannerAdverbAndAPrepositionPhrase = {
  id: "01a18d74-b29a-781e-88f6-09fe12f75cf9",
  type: "page-type/construction",
  slug: "verb-with-a-manner-adverb-and-a-preposition-phrase",
  definition:
    "a verb phrase written from a verb, a manner adverb, and the preposition phrase the verb acts through",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "part-of-speech/verb",
    "part-of-speech/manner-adverb",
    "phrase-kind/preposition-phrase",
  ],
  admits: ["how code asks again for a change a lock rejects", "asks again for a page"],
  refuses: ["again asks for a page", "asks for again a page"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The manner adverb sits straight after the verb, so it never reaches into a clause after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A manner adverb closing a verb phrase with nothing after it reads two ways, so it is not written.",
    },
  ],
  createdAt: "2026-10-30T15:36:37.784Z",
  updatedAt: "2026-10-30T15:36:37.784Z",
} as const satisfies Construction
