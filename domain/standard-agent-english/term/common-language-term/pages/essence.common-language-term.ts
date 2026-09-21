import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const essence = {
  id: "01a0c62c-89db-73b8-b480-9bdf067a7821",
  type: "page-type/common-language-term",
  slug: "essence",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "essence" },
    { partOfSpeech: "part-of-speech/noun", spelling: "essences" },
  ],
} as const satisfies CommonLanguageTerm
