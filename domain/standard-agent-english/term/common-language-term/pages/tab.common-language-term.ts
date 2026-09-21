import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const tab = {
  id: "01a0c627-24be-79ef-9005-a12b224ae1a7",
  type: "page-type/common-language-term",
  slug: "tab",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "tab" },
    { partOfSpeech: "part-of-speech/noun", spelling: "tabs" },
  ],
} as const satisfies CommonLanguageTerm
