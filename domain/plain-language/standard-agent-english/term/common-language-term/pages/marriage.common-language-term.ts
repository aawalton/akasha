import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const marriage = {
  id: "01a18d48-d264-778d-a0e5-193d216bfbba",
  type: "page-type/common-language-term",
  slug: "marriage",
  definition: "the union of two spouses",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "marriage" },
    { partOfSpeech: "part-of-speech/noun", spelling: "marriages" },
  ],
  createdAt: "2026-10-30T14:48:42.338Z",
  updatedAt: "2026-10-30T14:48:42.338Z",
} as const satisfies CommonLanguageTerm
