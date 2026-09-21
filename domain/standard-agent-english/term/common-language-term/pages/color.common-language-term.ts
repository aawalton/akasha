import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const color = {
  id: "01a0c628-b4cf-7e45-9b59-51be93f2221d",
  type: "page-type/common-language-term",
  slug: "color",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "color" },
    { partOfSpeech: "part-of-speech/noun", spelling: "colors" },
  ],
} as const satisfies CommonLanguageTerm
