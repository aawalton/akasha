import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const distance = {
  id: "01a18d50-ca08-75f8-9f50-fc441e8fc3c0",
  type: "page-type/common-language-term",
  slug: "distance",
  definition: "how far apart two places are",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "distance" },
    { partOfSpeech: "part-of-speech/noun", spelling: "distances" },
  ],
  createdAt: "2026-10-30T14:57:24.487Z",
  updatedAt: "2026-10-30T14:57:24.487Z",
} as const satisfies CommonLanguageTerm
