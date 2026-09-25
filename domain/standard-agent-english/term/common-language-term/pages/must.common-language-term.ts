import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const must = {
  id: "01a0d8f0-7faa-72fa-a878-4065c246e172",
  type: "page-type/common-language-term",
  slug: "must",
  definition: "is required to",
  spellings: [{ partOfSpeech: "part-of-speech/modal", spelling: "must" }],
} as const satisfies CommonLanguageTerm
