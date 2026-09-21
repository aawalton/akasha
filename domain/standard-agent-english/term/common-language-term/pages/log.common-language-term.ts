import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const log = {
  id: "01a0c627-c54b-70e2-8a08-2cf999ac4029",
  type: "page-type/common-language-term",
  slug: "log",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "log" },
    { partOfSpeech: "part-of-speech/noun", spelling: "logs" },
  ],
} as const satisfies CommonLanguageTerm
