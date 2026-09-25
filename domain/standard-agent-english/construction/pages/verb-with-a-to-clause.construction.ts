import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const verbWithAToClause = {
  id: "01a0d8b1-d687-7730-b888-5201f5daa9f5",
  type: "page-type/construction",
  slug: "verb-with-a-to-clause",
  definition: "a verb phrase written from a verb, to and a verb phrase",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "part-of-speech/verb",
    "part-of-speech/infinitive-marker",
    "phrase-kind/verb-phrase",
  ],
  admits: ["who Alan wants to become", "how Alan wants to read a page"],
  refuses: ["who Alan wants to"],
} as const satisfies Construction
