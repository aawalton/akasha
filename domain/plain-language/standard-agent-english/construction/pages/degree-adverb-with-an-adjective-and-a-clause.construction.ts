import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const degreeAdverbWithAnAdjectiveAndAClause = {
  id: "01a0d5ce-a902-7e5a-aa57-7d7f7e4b5594",
  type: "page-type/construction",
  slug: "degree-adverb-with-an-adjective-and-a-clause",
  definition: "a noun phrase written from a degree adverb, an adjective and a clause",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/degree-adverb",
    "part-of-speech/adjective",
    "phrase-kind/noun-phrase",
    "phrase-kind/verb-phrase",
  ],
  admits: ["how safe Alan feels"],
  refuses: ["what safe Alan feels", "how safe feels"],
} as const satisfies Construction
