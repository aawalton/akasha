import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const restart = {
  id: "01a0d41b-68d6-7761-8b5c-a73882eaa294",
  type: "page-type/common-language-term",
  slug: "restart",
  definition: "setting a thing going again after it stopped",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "restart" },
    { partOfSpeech: "part-of-speech/verb", spelling: "restarts" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "restarted" },
  ],
  createdAt: "2026-09-24T15:49:21.238Z",
  updatedAt: "2026-10-30T14:56:48.212Z",
} as const satisfies CommonLanguageTerm
