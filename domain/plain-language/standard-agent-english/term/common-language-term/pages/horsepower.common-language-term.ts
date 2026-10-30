import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const horsepower = {
  id: "01a18d4c-1aa2-7821-b36d-626c38a95768",
  type: "page-type/common-language-term",
  slug: "horsepower",
  definition: "a measure of how much power an engine or a motor gives out",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "horsepower" }],
  createdAt: "2026-10-30T14:52:17.441Z",
  updatedAt: "2026-10-30T14:52:17.441Z",
} as const satisfies CommonLanguageTerm
