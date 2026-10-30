import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const country = {
  id: "01a18d4d-1a40-7d28-bffd-ddfa2a08261c",
  type: "page-type/common-language-term",
  slug: "country",
  definition: "a nation with its own land and government",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "country" },
    { partOfSpeech: "part-of-speech/noun", spelling: "countries" },
  ],
  createdAt: "2026-10-30T14:53:22.878Z",
  updatedAt: "2026-10-30T14:53:22.878Z",
} as const satisfies CommonLanguageTerm
