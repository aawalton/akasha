import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const all = {
  id: "01a0c62b-3d10-79ec-aaad-fc56d0786325",
  type: "page-type/common-language-term",
  slug: "all",
  spellings: [
    { partOfSpeech: "part-of-speech/determiner", spelling: "all" },
    { partOfSpeech: "part-of-speech/noun", spelling: "all" },
  ],
  createdAt: "2026-09-21T22:51:57.584Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
