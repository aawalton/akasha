import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const verbAlone = {
  id: "01a0c9a2-e37e-7d7c-8d71-3d06a13a96b5",
  type: "page-type/construction",
  slug: "verb-alone",
  definition: "a verb phrase written from one verb",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/verb"],
  admits: ["runs", "reads", "has"],
  refuses: ["is kept", "run reads"],
} as const satisfies Construction
