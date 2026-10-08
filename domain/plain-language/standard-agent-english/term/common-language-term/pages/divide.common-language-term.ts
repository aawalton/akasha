import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const divide = {
  id: "01a0d8cf-9176-7aac-9694-e26ca39fa0da",
  type: "page-type/common-language-term",
  slug: "divide",
  definition: "to split into pieces",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "divide" },
    { partOfSpeech: "part-of-speech/verb", spelling: "divides" },
  ],
  createdAt: "2026-09-25T13:44:36.982Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
