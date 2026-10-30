import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const micromort = {
  id: "01a18d91-1bd7-787b-95ab-09862af6feda",
  type: "page-type/common-language-term",
  slug: "micromort",
  definition: "a one-in-a-million chance of dying",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "micromort" },
    { partOfSpeech: "part-of-speech/noun", spelling: "micromorts" },
  ],
  createdAt: "2026-10-30T16:07:39.734Z",
  updatedAt: "2026-10-30T16:07:39.734Z",
} as const satisfies CommonLanguageTerm
