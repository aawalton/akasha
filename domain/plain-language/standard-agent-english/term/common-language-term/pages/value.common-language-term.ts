import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const value = {
  id: "01a0caae-7739-7c71-a00b-1abc8abb4ae1",
  type: "page-type/common-language-term",
  slug: "value",
  definition: "what a name or a key is holding",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "value" },
    { partOfSpeech: "part-of-speech/noun", spelling: "values" },
  ],
} as const satisfies CommonLanguageTerm
