import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const course = {
  id: "01a0d492-524b-7a32-960a-4b70d5e68b26",
  type: "page-type/common-language-term",
  slug: "course",
  definition: "a set of lessons on one subject",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "course" },
    { partOfSpeech: "part-of-speech/noun", spelling: "courses" },
  ],
} as const satisfies CommonLanguageTerm
