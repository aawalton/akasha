import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const screen = {
  id: "01a0d8ec-476a-74e1-81e5-c68d9b940f66",
  type: "page-type/common-language-term",
  slug: "screen",
  definition: "the part of a machine that shows images",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "screen" },
    { partOfSpeech: "part-of-speech/noun", spelling: "screens" },
  ],
  createdAt: "2026-09-25T14:15:58.570Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
