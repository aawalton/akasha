import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const collectible = {
  id: "01a0c62c-9d95-77a7-b129-00ef0c0f1fe0",
  type: "page-type/common-language-term",
  slug: "collectible",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "collectible" },
    { partOfSpeech: "part-of-speech/noun", spelling: "collectibles" },
  ],
} as const satisfies CommonLanguageTerm
