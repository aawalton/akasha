import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const wheel = {
  id: "01a18d5a-ec28-757d-8d60-0388ec038dae",
  type: "page-type/common-language-term",
  slug: "wheel",
  definition: "a round part that turns to move a vehicle",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "wheel" },
    { partOfSpeech: "part-of-speech/noun", spelling: "wheels" },
  ],
  createdAt: "2026-10-30T15:08:28.583Z",
  updatedAt: "2026-10-30T15:08:28.583Z",
} as const satisfies CommonLanguageTerm
