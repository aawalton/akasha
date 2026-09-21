import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const picture = {
  id: "01a0c627-3622-7e13-b03a-67c892c15627",
  type: "page-type/common-language-term",
  slug: "picture",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "picture" },
    { partOfSpeech: "part-of-speech/noun", spelling: "pictures" },
  ],
} as const satisfies CommonLanguageTerm
