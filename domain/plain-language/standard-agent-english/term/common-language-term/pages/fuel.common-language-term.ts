import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const fuel = {
  id: "01a18d5e-a278-7ea3-8891-b1d82452c49c",
  type: "page-type/common-language-term",
  slug: "fuel",
  definition: "what an engine burns to run",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "fuel" }],
  createdAt: "2026-10-30T15:12:31.863Z",
  updatedAt: "2026-10-30T15:12:31.863Z",
} as const satisfies CommonLanguageTerm
