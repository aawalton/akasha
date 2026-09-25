import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const endure = {
  id: "01a0d58b-afce-7040-85eb-ee2e058312d2",
  type: "page-type/common-language-term",
  slug: "endure",
  definition: "to bear something hard without giving way",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "endure" },
    { partOfSpeech: "part-of-speech/verb", spelling: "endures" },
  ],
} as const satisfies CommonLanguageTerm
