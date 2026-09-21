import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const processor = {
  id: "01a0c628-d825-7890-8f21-e35973de0b12",
  type: "page-type/common-language-term",
  slug: "processor",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "processor" },
    { partOfSpeech: "part-of-speech/noun", spelling: "processors" },
  ],
} as const satisfies CommonLanguageTerm
