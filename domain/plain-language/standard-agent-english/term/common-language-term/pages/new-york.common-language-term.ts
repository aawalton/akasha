import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const newYork = {
  id: "01a18d7b-f404-7621-ad04-caf93f130bd0",
  type: "page-type/common-language-term",
  slug: "new-york",
  definition: "the largest city in the United States",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "New York" }],
  createdAt: "2026-10-30T15:44:33.282Z",
  updatedAt: "2026-10-30T15:44:33.282Z",
} as const satisfies CommonLanguageTerm
