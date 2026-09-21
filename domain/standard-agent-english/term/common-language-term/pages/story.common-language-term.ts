import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const story = {
  id: "01a0c623-aa89-7a99-9315-d49178c3c69c",
  type: "page-type/common-language-term",
  slug: "story",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "story" },
    { partOfSpeech: "part-of-speech/noun", spelling: "stories" },
  ],
} as const satisfies CommonLanguageTerm
