import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const verbWithANounPhraseAndAToClause = {
  id: "01a0d890-b53d-7cc6-810c-bf8163e07242",
  type: "page-type/construction",
  slug: "verb-with-a-noun-phrase-and-a-to-clause",
  definition: "a verb phrase written from a verb, a noun phrase, to and a verb phrase",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "part-of-speech/verb",
    "phrase-kind/noun-phrase",
    "part-of-speech/infinitive-marker",
    "phrase-kind/verb-phrase",
  ],
  admits: [
    "how Alan expects today to affect long-term health",
    "how Alan expects agents to find a page",
  ],
  refuses: ["how Alan expects today to", "how Alan expects today affect health"],
} as const satisfies Construction
