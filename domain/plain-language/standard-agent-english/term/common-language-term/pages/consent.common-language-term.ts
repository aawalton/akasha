import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const consent = {
  id: "01a0d579-3b81-7700-beda-3d095047035e",
  type: "page-type/common-language-term",
  slug: "consent",
  definition: "leave someone gives for something to be done",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "consent" },
    { partOfSpeech: "part-of-speech/noun", spelling: "consents" },
  ],
  createdAt: "2026-09-24T22:11:27.233Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
