import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const program = {
  id: "01a0c624-8bad-7679-b004-18d185c4cb69",
  type: "page-type/common-language-term",
  slug: "program",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "program" },
    { partOfSpeech: "part-of-speech/noun", spelling: "programs" },
  ],
} as const satisfies CommonLanguageTerm
