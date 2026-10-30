import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const levelTwoCharger = {
  id: "01a18d55-bcc5-7a59-a035-b2a27be4a363",
  type: "page-type/common-language-term",
  slug: "level-two-charger",
  definition: "a charger for an electric car that runs on the 240 volt power a house has",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "level two charger" },
    { partOfSpeech: "part-of-speech/noun", spelling: "level two chargers" },
  ],
  createdAt: "2026-10-30T15:02:48.772Z",
  updatedAt: "2026-10-30T15:02:48.772Z",
} as const satisfies CommonLanguageTerm
