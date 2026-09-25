import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const parent = {
  id: "01a0d924-700f-74d2-972a-b08d50e0d06b",
  type: "page-type/common-language-term",
  slug: "parent",
  definition: "the thing another thing sits under",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "parent" },
    { partOfSpeech: "part-of-speech/noun", spelling: "parents" },
  ],
} as const satisfies CommonLanguageTerm
