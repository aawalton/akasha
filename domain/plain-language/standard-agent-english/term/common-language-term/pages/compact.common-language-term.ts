import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const compact = {
  id: "01a155bc-3bbc-7195-a001-bda18c3df658",
  type: "page-type/common-language-term",
  slug: "compact",
  definition: "replacing a conversation with a shorter summary of the conversation",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "compact" },
    { partOfSpeech: "part-of-speech/verb", spelling: "compacts" },
  ],
  createdAt: "2026-10-19T19:56:01.851Z",
  updatedAt: "2026-10-19T19:56:01.851Z",
} as const satisfies CommonLanguageTerm
