import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const verbWithANounPhraseAndAMannerAdverb = {
  id: "01a1559d-e2e3-7f1c-8f28-b627ec13d9a7",
  type: "page-type/construction",
  slug: "verb-with-a-noun-phrase-and-a-manner-adverb",
  definition: "a verb phrase written from a verb, the noun phrase it acts on, and a manner adverb",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/verb", "phrase-kind/noun-phrase", "part-of-speech/manner-adverb"],
  admits: ["runs a model faster"],
  refuses: ["faster runs a model"],
  createdAt: "2026-10-19T19:22:53.026Z",
  updatedAt: "2026-10-19T19:22:53.026Z",
} as const satisfies Construction
