import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const pin = {
  id: "01a0c622-b3b9-77a4-9806-e675154984f8",
  type: "page-type/common-language-term",
  slug: "pin",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "pin" },
    { partOfSpeech: "part-of-speech/noun", spelling: "pins" },
  ],
} as const satisfies CommonLanguageTerm
