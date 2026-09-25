import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounGroupWithADeterminer = {
  id: "01a0c58c-287b-70be-abf3-05d84f4c124b",
  type: "page-type/construction",
  slug: "noun-group-with-a-determiner",
  definition: "a noun phrase written from a determiner and the noun group that determiner names",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: ["part-of-speech/determiner", "phrase-kind/noun-group"],
  admits: ["the code", "a machine", "an answer"],
  refuses: ["code the", "the a code"],
} as const satisfies Construction
