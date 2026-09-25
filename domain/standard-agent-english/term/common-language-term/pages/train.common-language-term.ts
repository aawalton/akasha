import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const train = {
  id: "01a0d8ba-3261-7421-a34a-83faaaf09fb5",
  type: "page-type/common-language-term",
  slug: "train",
  definition: "to exercise to grow stronger",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "train" },
    { partOfSpeech: "part-of-speech/verb", spelling: "trains" },
  ],
} as const satisfies CommonLanguageTerm
