import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const low = {
  id: "01a18d47-4aa3-779c-9df1-77028e1e5a95",
  type: "page-type/common-language-term",
  slug: "low",
  definition: "near the ground",
  spellings: [
    { partOfSpeech: "part-of-speech/adjective", spelling: "low" },
    { partOfSpeech: "part-of-speech/adjective", spelling: "lower" },
    { partOfSpeech: "part-of-speech/adjective", spelling: "lowest" },
  ],
  createdAt: "2026-10-30T14:47:02.050Z",
  updatedAt: "2026-10-30T14:47:02.050Z",
} as const satisfies CommonLanguageTerm
