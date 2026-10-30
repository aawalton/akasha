import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const activity = {
  id: "01a18d89-c163-724d-bb8e-3e932692a292",
  type: "page-type/common-language-term",
  slug: "activity",
  definition: "a thing a person does",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "activity" },
    { partOfSpeech: "part-of-speech/noun", spelling: "activities" },
  ],
  createdAt: "2026-10-30T15:59:37.826Z",
  updatedAt: "2026-10-30T15:59:37.826Z",
} as const satisfies CommonLanguageTerm
