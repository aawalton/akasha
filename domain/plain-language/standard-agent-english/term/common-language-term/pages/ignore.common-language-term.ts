import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const ignore = {
  id: "01a18dec-d060-7629-9f5a-a2f55bd74903",
  type: "page-type/common-language-term",
  slug: "ignore",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "ignore" },
    { partOfSpeech: "part-of-speech/verb", spelling: "ignores" },
    { partOfSpeech: "part-of-speech/verb", spelling: "ignored" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "ignored" },
  ],
  createdAt: "2026-10-30T17:47:49.726Z",
  updatedAt: "2026-10-30T17:47:49.726Z",
} as const satisfies CommonLanguageTerm
