import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const text = {
  id: "01a0c623-5c03-7e8a-b974-638eb101ecd1",
  type: "page-type/common-language-term",
  slug: "text",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "text" },
    { partOfSpeech: "part-of-speech/noun", spelling: "texts" },
  ],
} as const satisfies CommonLanguageTerm
