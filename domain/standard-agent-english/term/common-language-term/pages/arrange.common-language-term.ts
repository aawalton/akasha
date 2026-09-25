import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const arrange = {
  id: "01a0d908-f9d3-77bf-9a7b-05070b4de132",
  type: "page-type/common-language-term",
  slug: "arrange",
  definition: "to put things in order",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "arrange" },
    { partOfSpeech: "part-of-speech/verb", spelling: "arranges" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "arranged" },
  ],
} as const satisfies CommonLanguageTerm
