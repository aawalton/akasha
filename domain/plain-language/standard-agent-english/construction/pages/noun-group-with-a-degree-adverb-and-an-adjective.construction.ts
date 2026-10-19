import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounGroupWithADegreeAdverbAndAnAdjective = {
  id: "01a1558a-6bae-7d16-aa4a-c6bbaccb595d",
  type: "page-type/construction",
  slug: "noun-group-with-a-degree-adverb-and-an-adjective",
  definition:
    "a noun group written from a degree adverb, an adjective, and the noun group that adjective describes",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "part-of-speech/degree-adverb",
    "part-of-speech/adjective",
    "phrase-kind/noun-group",
  ],
  admits: ["most capable model family", "most capable page"],
  refuses: ["capable most model family", "most capable"],
  createdAt: "2026-10-19T19:01:37.324Z",
  updatedAt: "2026-10-19T19:01:37.324Z",
} as const satisfies Construction
