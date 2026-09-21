import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const material = {
  id: "01a0c62d-c66d-7a55-9ae5-9e4d15010380",
  type: "page-type/common-language-term",
  slug: "material",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "material" },
    { partOfSpeech: "part-of-speech/noun", spelling: "materials" },
  ],
} as const satisfies CommonLanguageTerm
