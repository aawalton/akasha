import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const to = {
  id: "01a0ca69-a4cf-7b33-8de3-21914872d1dd",
  type: "page-type/common-language-term",
  slug: "to",
  definition: "the preposition naming what a thing is sent or given to",
  spellings: [
    { partOfSpeech: "part-of-speech/preposition", spelling: "to" },
    { partOfSpeech: "part-of-speech/infinitive-marker", spelling: "to" },
  ],
  createdAt: "2026-09-22T18:38:36.239Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
