import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const repair = {
  id: "01a18d62-9be5-7d8b-8c3d-82e4644518d6",
  type: "page-type/common-language-term",
  slug: "repair",
  definition: "work that mends a broken thing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "repair" },
    { partOfSpeech: "part-of-speech/noun", spelling: "repairs" },
    { partOfSpeech: "part-of-speech/verb", spelling: "repair" },
    { partOfSpeech: "part-of-speech/verb", spelling: "repairs" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "repaired" },
  ],
  createdAt: "2026-10-30T15:16:52.324Z",
  updatedAt: "2026-10-30T17:18:30.023Z",
} as const satisfies CommonLanguageTerm
