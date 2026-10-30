import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const ball = {
  id: "01a18dbe-f329-7bda-ba9f-39fa27c6663c",
  type: "page-type/common-language-term",
  slug: "ball",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "ball" },
    { partOfSpeech: "part-of-speech/noun", spelling: "balls" },
  ],
  createdAt: "2026-10-30T16:57:43.976Z",
  updatedAt: "2026-10-30T16:57:43.976Z",
} as const satisfies CommonLanguageTerm
