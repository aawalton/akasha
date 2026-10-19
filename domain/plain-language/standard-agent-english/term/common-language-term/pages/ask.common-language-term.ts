import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const ask = {
  id: "01a155c8-7446-7b6f-94ff-59e92bbbc1b6",
  type: "page-type/common-language-term",
  slug: "ask",
  definition: "putting a question to someone",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "ask" },
    { partOfSpeech: "part-of-speech/verb", spelling: "asks" },
  ],
  createdAt: "2026-10-19T20:09:22.757Z",
  updatedAt: "2026-10-19T20:09:22.757Z",
} as const satisfies CommonLanguageTerm
