import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const move = {
  id: "01a0ca15-5378-78c7-b077-83840e5a64d6",
  type: "page-type/common-language-term",
  slug: "move",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "move" },
    { partOfSpeech: "part-of-speech/verb", spelling: "move" },
    { partOfSpeech: "part-of-speech/verb", spelling: "moves" },
  ],
  createdAt: "2026-09-22T17:06:30.392Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
