import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const reason = {
  id: "01a18d63-043e-7dfe-8253-c8389b2c13e6",
  type: "page-type/common-language-term",
  slug: "reason",
  definition: "what explains why something is so or why someone acts",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "reason" },
    { partOfSpeech: "part-of-speech/noun", spelling: "reasons" },
  ],
  createdAt: "2026-10-30T15:17:19.037Z",
  updatedAt: "2026-10-30T15:17:19.037Z",
} as const satisfies CommonLanguageTerm
