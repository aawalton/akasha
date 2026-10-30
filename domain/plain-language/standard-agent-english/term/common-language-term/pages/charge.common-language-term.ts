import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const charge = {
  id: "01a18d53-8c6e-7dfe-9173-7fda583c44c2",
  type: "page-type/common-language-term",
  slug: "charge",
  definition: "to fill a battery with electric energy",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "charge" },
    { partOfSpeech: "part-of-speech/verb", spelling: "charges" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "charged" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "charging" },
  ],
  createdAt: "2026-10-30T15:00:25.324Z",
  updatedAt: "2026-10-30T15:00:25.324Z",
} as const satisfies CommonLanguageTerm
