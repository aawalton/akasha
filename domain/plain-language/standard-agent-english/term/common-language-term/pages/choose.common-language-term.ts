import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const choose = {
  id: "01a0ca4b-aae2-758e-bbbe-c3d339ac1476",
  type: "page-type/common-language-term",
  slug: "choose",
  definition: "settling which one it is, as somebody takes the one they want",
  spellings: [
    { partOfSpeech: "part-of-speech/past-participle", spelling: "chosen" },
    { partOfSpeech: "part-of-speech/verb", spelling: "chooses" },
  ],
  createdAt: "2026-09-22T18:05:51.714Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
