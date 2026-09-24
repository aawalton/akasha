import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const body = {
  id: "01a0d5b8-6729-7233-bfef-d67165d544d3",
  type: "page-type/common-language-term",
  slug: "body",
  definition: "the physical form of a person",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "body" },
    { partOfSpeech: "part-of-speech/noun", spelling: "bodies" },
  ],
} as const satisfies CommonLanguageTerm
