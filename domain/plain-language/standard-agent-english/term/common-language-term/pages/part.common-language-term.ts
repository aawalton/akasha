import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const part = {
  id: "01a0d985-09de-73fc-a49c-280abb7cce65",
  type: "page-type/common-language-term",
  slug: "part",
  definition: "one of the pieces that make up a whole",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "part" },
    { partOfSpeech: "part-of-speech/noun", spelling: "parts" },
  ],
  createdAt: "2026-09-25T17:02:49.822Z",
  updatedAt: "2026-09-25T17:03:03.000Z",
} as const satisfies CommonLanguageTerm
