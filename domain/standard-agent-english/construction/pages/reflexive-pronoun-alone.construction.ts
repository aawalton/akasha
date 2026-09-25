import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const reflexivePronounAlone = {
  id: "01a0d8af-02fc-744e-88e6-cbaa91513ce7",
  type: "page-type/construction",
  slug: "reflexive-pronoun-alone",
  definition: "a noun phrase written from a reflexive pronoun alone",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: ["part-of-speech/reflexive-pronoun"],
  admits: ["how Alan cares for himself"],
  refuses: ["how Alan cares for the himself"],
} as const satisfies Construction
