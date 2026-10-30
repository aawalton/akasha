import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const include = {
  id: "01a18d4b-4ea5-7b97-b3eb-5f1d885b6e83",
  type: "page-type/common-language-term",
  slug: "include",
  definition: "to have a thing as one part of the whole",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "include" },
    { partOfSpeech: "part-of-speech/verb", spelling: "includes" },
  ],
  createdAt: "2026-10-30T14:51:25.220Z",
  updatedAt: "2026-10-30T14:51:25.220Z",
} as const satisfies CommonLanguageTerm
