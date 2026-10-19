import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const modalWithANegatorAndAVerbPhrase = {
  id: "01a15577-d96f-790a-b2a2-54e5fb73db4f",
  type: "page-type/construction",
  slug: "modal-with-a-negator-and-a-verb-phrase",
  definition:
    "a verb phrase written from a modal, a negator, and the verb phrase that modal bears on",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/modal", "part-of-speech/negator", "phrase-kind/verb-phrase"],
  admits: ["can not spend", "must not read", "can not read from a page"],
  refuses: ["not can read", "can not"],
  createdAt: "2026-10-19T18:41:20.238Z",
  updatedAt: "2026-10-19T18:41:20.238Z",
} as const satisfies Construction
