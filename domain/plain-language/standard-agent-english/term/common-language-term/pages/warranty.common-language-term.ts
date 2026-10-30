import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const warranty = {
  id: "01a18d55-787a-73d4-bf9d-6509b1b00e9d",
  type: "page-type/common-language-term",
  slug: "warranty",
  definition: "a promise a seller makes to mend or replace a product",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "warranty" },
    { partOfSpeech: "part-of-speech/noun", spelling: "warranties" },
  ],
  createdAt: "2026-10-30T15:02:31.288Z",
  updatedAt: "2026-10-30T15:02:31.288Z",
} as const satisfies CommonLanguageTerm
