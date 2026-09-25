import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const know = {
  id: "01a0d48f-d55b-7217-a75a-78aece8ada65",
  type: "page-type/common-language-term",
  slug: "know",
  definition: "to hold a thing as true in the mind",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "know" },
    { partOfSpeech: "part-of-speech/verb", spelling: "knows" },
  ],
} as const satisfies CommonLanguageTerm
