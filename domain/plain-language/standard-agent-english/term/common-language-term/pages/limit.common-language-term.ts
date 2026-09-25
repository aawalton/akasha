import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const limit = {
  id: "01a0d96f-60e3-77fa-bb23-f523dce2405e",
  type: "page-type/common-language-term",
  slug: "limit",
  definition: "the most that is allowed",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "limit" },
    { partOfSpeech: "part-of-speech/noun", spelling: "limits" },
  ],
} as const satisfies CommonLanguageTerm
