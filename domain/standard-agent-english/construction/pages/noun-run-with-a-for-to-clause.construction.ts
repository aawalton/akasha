import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAForToClause = {
  id: "01a0d57c-f7ff-726a-9c6f-2649d55c91cf",
  type: "page-type/construction",
  slug: "noun-run-with-a-for-to-clause",
  definition: "a noun group written from a noun run and a clause saying who does what",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/preposition",
    "phrase-kind/noun-phrase",
    "part-of-speech/infinitive-marker",
    "phrase-kind/verb-phrase",
  ],
  admits: ["Alan's consent for akasha to use Google", "a place for people to read stories"],
  refuses: ["consent for to use Google", "consent for akasha to"],
} as const satisfies Construction
