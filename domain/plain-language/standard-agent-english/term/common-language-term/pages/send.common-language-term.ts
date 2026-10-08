import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const send = {
  id: "01a0d5c6-19d9-73f2-a869-3de23031ba5e",
  type: "page-type/common-language-term",
  slug: "send",
  definition: "to make something go to someone",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "send" },
    { partOfSpeech: "part-of-speech/verb", spelling: "sends" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "sent" },
  ],
  createdAt: "2026-09-24T23:35:24.889Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
