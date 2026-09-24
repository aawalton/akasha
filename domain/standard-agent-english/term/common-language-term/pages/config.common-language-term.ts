import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const config = {
  id: "01a0d43d-8075-7001-a749-5e6b600b1cdc",
  type: "page-type/common-language-term",
  slug: "config",
  definition: "the settings a program is given",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "config" },
    { partOfSpeech: "part-of-speech/noun", spelling: "configs" },
  ],
} as const satisfies CommonLanguageTerm
