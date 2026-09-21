import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const station = {
  id: "01a0c628-8f1c-70ee-b703-e6a4dcd4c36c",
  type: "page-type/common-language-term",
  slug: "station",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "station" },
    { partOfSpeech: "part-of-speech/noun", spelling: "stations" },
  ],
} as const satisfies CommonLanguageTerm
