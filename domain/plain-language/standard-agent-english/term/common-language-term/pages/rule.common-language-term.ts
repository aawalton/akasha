import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const rule = {
  id: "01a1554e-77ec-76e0-8fe7-a882a7677d6d",
  type: "page-type/common-language-term",
  slug: "rule",
  definition: "a statement of what must or must not be done",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "rule" },
    { partOfSpeech: "part-of-speech/noun", spelling: "rules" },
  ],
  createdAt: "2026-10-19T17:56:08.298Z",
  updatedAt: "2026-10-19T17:56:08.298Z",
} as const satisfies CommonLanguageTerm
