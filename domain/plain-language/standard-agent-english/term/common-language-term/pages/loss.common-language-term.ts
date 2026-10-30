import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const loss = {
  id: "01a18d9b-3c96-725d-8fd4-d850c914adaf",
  type: "page-type/common-language-term",
  slug: "loss",
  definition: "an amount that is lost",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "loss" },
    { partOfSpeech: "part-of-speech/noun", spelling: "losses" },
  ],
  createdAt: "2026-10-30T16:18:43.478Z",
  updatedAt: "2026-10-30T16:18:43.478Z",
} as const satisfies CommonLanguageTerm
