import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const degreeAdverbWithAMannerAdverbAndAClause = {
  id: "01a18d73-4941-7662-9d5f-d00808e2a6f0",
  type: "page-type/construction",
  slug: "degree-adverb-with-a-manner-adverb-and-a-clause",
  definition: "a noun phrase written from a degree adverb, a manner adverb and a clause",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/degree-adverb",
    "part-of-speech/manner-adverb",
    "phrase-kind/noun-phrase",
    "phrase-kind/verb-phrase",
  ],
  admits: ["how well Alan knows a learn everything topic", "how well a seat runs"],
  refuses: ["how well knows a topic", "well how Alan knows a topic"],
  createdAt: "2026-10-30T15:35:05.275Z",
  updatedAt: "2026-10-30T15:35:05.275Z",
} as const satisfies Construction
