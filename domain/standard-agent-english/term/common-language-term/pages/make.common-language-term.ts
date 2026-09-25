import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const make = {
  id: "01a0d8be-8e19-7c96-be50-f6981a19635c",
  type: "page-type/common-language-term",
  slug: "make",
  definition: "to bring about",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "make" },
    { partOfSpeech: "part-of-speech/verb", spelling: "makes" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "made" },
  ],
} as const satisfies CommonLanguageTerm
