import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const number = {
  id: "01a0c624-77fb-7804-8402-270af81c5f55",
  type: "page-type/common-language-term",
  slug: "number",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "number" },
    { partOfSpeech: "part-of-speech/noun", spelling: "numbers" },
  ],
} as const satisfies CommonLanguageTerm
