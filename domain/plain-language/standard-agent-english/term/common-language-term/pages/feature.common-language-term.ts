import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const feature = {
  id: "01a18d52-7097-7cf3-9481-bd3561bae3ee",
  type: "page-type/common-language-term",
  slug: "feature",
  definition: "a thing a product can do",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "feature" },
    { partOfSpeech: "part-of-speech/noun", spelling: "features" },
  ],
  createdAt: "2026-10-30T14:59:12.662Z",
  updatedAt: "2026-10-30T14:59:12.662Z",
} as const satisfies CommonLanguageTerm
