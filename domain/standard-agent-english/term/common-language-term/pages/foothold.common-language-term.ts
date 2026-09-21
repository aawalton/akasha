import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const foothold = {
  id: "01a0c600-f50b-7013-a509-5ff70a5f3266",
  type: "page-type/common-language-term",
  slug: "foothold",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "foothold" }],
} as const satisfies CommonLanguageTerm
