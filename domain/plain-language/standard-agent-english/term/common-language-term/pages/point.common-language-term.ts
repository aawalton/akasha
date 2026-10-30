import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const point = {
  id: "01a18d46-0a0f-70ee-8608-45fc22e31693",
  type: "page-type/common-language-term",
  slug: "point",
  definition: "a unit a score is counted in",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "point" },
    { partOfSpeech: "part-of-speech/noun", spelling: "points" },
  ],
  createdAt: "2026-10-30T14:45:39.980Z",
  updatedAt: "2026-10-30T14:45:39.980Z",
} as const satisfies CommonLanguageTerm
