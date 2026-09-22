import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const program = {
  id: "01a0c982-c1e5-79dd-86e4-d00b46197d8b",
  type: "page-type/common-language-term",
  slug: "program",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "program" },
    { partOfSpeech: "part-of-speech/noun", spelling: "programs" },
  ],
} as const satisfies CommonLanguageTerm
