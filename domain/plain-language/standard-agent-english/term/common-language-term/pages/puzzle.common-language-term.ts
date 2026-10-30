import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const puzzle = {
  id: "01a18d54-315c-7eb3-b5e2-17ef3cec6177",
  type: "page-type/common-language-term",
  slug: "puzzle",
  definition: "a problem a player solves",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "puzzle" },
    { partOfSpeech: "part-of-speech/noun", spelling: "puzzles" },
  ],
  createdAt: "2026-10-30T15:01:07.548Z",
  updatedAt: "2026-10-30T15:01:07.548Z",
} as const satisfies CommonLanguageTerm
