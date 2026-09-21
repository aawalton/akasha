import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const image = {
  id: "01a0c601-3d0a-7cd0-bcce-8d2da7be7483",
  type: "page-type/common-language-term",
  slug: "image",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "image" }],
} as const satisfies CommonLanguageTerm
