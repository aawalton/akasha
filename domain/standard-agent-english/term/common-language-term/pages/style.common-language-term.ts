import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const style = {
  id: "01a0c62d-d870-7ee6-a12a-165399f275ba",
  type: "page-type/common-language-term",
  slug: "style",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "style" },
    { partOfSpeech: "part-of-speech/noun", spelling: "styles" },
  ],
} as const satisfies CommonLanguageTerm
