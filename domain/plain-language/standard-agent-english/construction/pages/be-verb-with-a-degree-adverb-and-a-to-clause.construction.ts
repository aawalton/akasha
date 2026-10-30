import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const beVerbWithADegreeAdverbAndAToClause = {
  id: "01a18d7f-9ecd-773f-8c4c-1b8a1bb9879c",
  type: "page-type/construction",
  slug: "be-verb-with-a-degree-adverb-and-a-to-clause",
  definition: "a verb phrase written from a form of be, a degree adverb, to and a verb phrase",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "part-of-speech/be-verb",
    "part-of-speech/degree-adverb",
    "part-of-speech/infinitive-marker",
    "phrase-kind/verb-phrase",
  ],
  admits: ["work that is still to come"],
  refuses: ["work that is still to", "work that still is to come"],
  createdAt: "2026-10-30T15:48:33.611Z",
  updatedAt: "2026-10-30T15:48:33.611Z",
} as const satisfies Construction
