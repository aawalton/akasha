import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const chemistry = {
  id: "01a18d4b-4ea3-7a87-8ca1-efe97e4b0d25",
  type: "page-type/common-language-term",
  slug: "chemistry",
  definition: "the substances a thing is made of",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "chemistry" }],
  createdAt: "2026-10-30T14:51:25.218Z",
  updatedAt: "2026-10-30T14:51:25.218Z",
} as const satisfies CommonLanguageTerm
