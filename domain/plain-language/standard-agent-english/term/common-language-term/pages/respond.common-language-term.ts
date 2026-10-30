import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const respond = {
  id: "01a18d4c-6093-767b-b4e3-0186d49660c7",
  type: "page-type/common-language-term",
  slug: "respond",
  definition: "sending something back to a request",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "respond" },
    { partOfSpeech: "part-of-speech/verb", spelling: "responds" },
  ],
  createdAt: "2026-10-30T14:52:35.346Z",
  updatedAt: "2026-10-30T14:52:35.346Z",
} as const satisfies CommonLanguageTerm
