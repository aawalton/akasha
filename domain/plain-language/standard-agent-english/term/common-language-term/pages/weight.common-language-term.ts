import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const weight = {
  id: "01a18d47-00a3-763d-b8a0-220c79e229c5",
  type: "page-type/common-language-term",
  slug: "weight",
  definition: "how heavy a thing is",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "weight" },
    { partOfSpeech: "part-of-speech/noun", spelling: "weights" },
  ],
  createdAt: "2026-10-30T14:46:43.105Z",
  updatedAt: "2026-10-30T14:46:43.105Z",
} as const satisfies CommonLanguageTerm
