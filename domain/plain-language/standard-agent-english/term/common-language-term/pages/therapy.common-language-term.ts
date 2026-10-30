import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const therapy = {
  id: "01a18d45-85b0-7dee-923a-14104ff11549",
  type: "page-type/common-language-term",
  slug: "therapy",
  definition: "talk that treats a trouble of the mind or of a relationship",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "therapy" }],
  createdAt: "2026-10-30T14:45:06.092Z",
  updatedAt: "2026-10-30T14:45:06.092Z",
} as const satisfies CommonLanguageTerm
