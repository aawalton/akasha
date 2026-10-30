import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const recall = {
  id: "01a18d7e-e706-7944-8a3f-9c60ea4e6f9e",
  type: "page-type/common-language-term",
  slug: "recall",
  definition: "a call by a maker for owners to bring a product back to fix it",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "recall" },
    { partOfSpeech: "part-of-speech/noun", spelling: "recalls" },
  ],
  createdAt: "2026-10-30T15:47:46.565Z",
  updatedAt: "2026-10-30T15:47:46.565Z",
} as const satisfies CommonLanguageTerm
