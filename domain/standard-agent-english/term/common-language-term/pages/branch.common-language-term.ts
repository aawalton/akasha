import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const branch = {
  id: "01a0c629-6b8b-774f-b438-1b1af49a0e55",
  type: "page-type/common-language-term",
  slug: "branch",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "branch" },
    { partOfSpeech: "part-of-speech/noun", spelling: "branches" },
  ],
} as const satisfies CommonLanguageTerm
