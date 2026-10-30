import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const carplay = {
  id: "01a18d51-9bfd-7dc1-84f4-b4603a957746",
  type: "page-type/common-language-term",
  slug: "carplay",
  definition: "the program from Apple that shows an iPhone on the screen of a car",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "CarPlay" }],
  createdAt: "2026-10-30T14:58:18.235Z",
  updatedAt: "2026-10-30T14:58:18.235Z",
} as const satisfies CommonLanguageTerm
