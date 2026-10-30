import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const player = {
  id: "01a18d4f-e968-75c7-83e9-a5aaf6d60309",
  type: "page-type/common-language-term",
  slug: "player",
  definition: "someone who takes part in a game",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "player" },
    { partOfSpeech: "part-of-speech/noun", spelling: "players" },
  ],
  createdAt: "2026-10-30T14:56:26.984Z",
  updatedAt: "2026-10-30T14:56:26.984Z",
} as const satisfies CommonLanguageTerm
