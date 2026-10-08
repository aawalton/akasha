import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const reflexivePronounAlone = {
  id: "01a0d8af-02fc-744e-88e6-cbaa91513ce7",
  type: "page-type/construction",
  slug: "reflexive-pronoun-alone",
  definition: "a noun phrase written from a reflexive pronoun alone",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: ["part-of-speech/reflexive-pronoun"],
  admits: ["how Alan cares for himself"],
  refuses: ["how Alan cares for the himself"],
  createdAt: "2026-09-25T13:09:03.356Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies Construction
