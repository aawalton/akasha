import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const wait = {
  id: "01a0d5b8-6729-72c1-828b-c0f2275caf1a",
  type: "page-type/common-language-term",
  slug: "wait",
  definition: "to stay until something happens",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "wait" },
    { partOfSpeech: "part-of-speech/verb", spelling: "waits" },
  ],
} as const satisfies CommonLanguageTerm
