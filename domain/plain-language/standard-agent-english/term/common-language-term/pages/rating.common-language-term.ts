import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const rating = {
  id: "01a18d59-50c2-75e5-8866-d3e1f9912c15",
  type: "page-type/common-language-term",
  slug: "rating",
  definition: "a number giving how strong a player is or how hard a task is",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "rating" },
    { partOfSpeech: "part-of-speech/noun", spelling: "ratings" },
  ],
  createdAt: "2026-10-30T15:06:43.264Z",
  updatedAt: "2026-10-30T15:06:43.264Z",
} as const satisfies CommonLanguageTerm
