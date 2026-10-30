import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const doVerbWithANegatorAndAVerbPhrase = {
  id: "01a18d81-a3b3-72b7-9761-a208b36f0176",
  type: "page-type/construction",
  slug: "do-verb-with-a-negator-and-a-verb-phrase",
  definition:
    "a verb phrase written from a form of do, a negator, and the verb phrase that is not done",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/do-verb", "part-of-speech/negator", "phrase-kind/verb-phrase"],
  admits: ["a page that does not change", "whether a seat does not reply"],
  refuses: ["a page that not does change", "a page that does not"],
  createdAt: "2026-10-30T15:50:45.938Z",
  updatedAt: "2026-10-30T15:50:45.938Z",
} as const satisfies Construction
