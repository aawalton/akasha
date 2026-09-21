import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermType = {
  id: "01a0c62b-6177-72ea-af35-c855e08f5858",
  type: "page-type/common-language-term",
  slug: "common-language-term-type",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "type" },
    { partOfSpeech: "part-of-speech/noun", spelling: "types" },
  ],
} as const satisfies CommonLanguageTerm
