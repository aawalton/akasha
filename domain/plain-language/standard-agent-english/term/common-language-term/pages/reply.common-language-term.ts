import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const reply = {
  id: "01a18d4b-4906-77e6-b55e-d40a298c7425",
  type: "page-type/common-language-term",
  slug: "reply",
  definition: "words written back to a message",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "reply" },
    { partOfSpeech: "part-of-speech/noun", spelling: "replies" },
    { partOfSpeech: "part-of-speech/verb", spelling: "reply" },
    { partOfSpeech: "part-of-speech/verb", spelling: "replies" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "replied" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "replying" },
  ],
  createdAt: "2026-10-30T14:51:23.780Z",
  updatedAt: "2026-10-30T14:51:23.780Z",
} as const satisfies CommonLanguageTerm
