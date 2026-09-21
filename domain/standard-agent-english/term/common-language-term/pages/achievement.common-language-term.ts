import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const achievement = {
  id: "01a0c623-f7aa-77e1-b3e1-c14d322d962b",
  type: "page-type/common-language-term",
  slug: "achievement",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "achievement" },
    { partOfSpeech: "part-of-speech/noun", spelling: "achievements" },
  ],
} as const satisfies CommonLanguageTerm
