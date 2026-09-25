import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const circle = {
  id: "01a0d915-2eeb-768a-b658-e5d024131f51",
  type: "page-type/common-language-term",
  slug: "circle",
  definition: "a round line",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "circle" },
    { partOfSpeech: "part-of-speech/noun", spelling: "circles" },
  ],
} as const satisfies CommonLanguageTerm
