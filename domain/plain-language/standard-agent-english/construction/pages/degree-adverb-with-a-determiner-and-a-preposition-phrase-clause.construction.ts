import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const degreeAdverbWithADeterminerAndAPrepositionPhraseClause = {
  id: "01a18d73-493f-7cfa-9186-31ebf1514fdd",
  type: "page-type/construction",
  slug: "degree-adverb-with-a-determiner-and-a-preposition-phrase-clause",
  definition:
    "a noun phrase written from a degree adverb, a determiner, a preposition phrase and a verb phrase",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/degree-adverb",
    "part-of-speech/determiner",
    "phrase-kind/preposition-phrase",
    "phrase-kind/verb-phrase",
  ],
  admits: ["how much of a collection is done", "how much of Alan's day was spent with Jenny"],
  refuses: ["how much of a collection", "how much is done of a collection"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The degree adverb, the determiner and the preposition phrase are the subject of the verb phrase.",
    },
  ],
  createdAt: "2026-10-30T15:35:05.275Z",
  updatedAt: "2026-10-30T15:35:05.275Z",
} as const satisfies Construction
