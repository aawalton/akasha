import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const need = {
  id: "01a15550-0587-7662-805e-b0492544141a",
  type: "page-type/common-language-term",
  slug: "need",
  definition: "having to have something",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "need" },
    { partOfSpeech: "part-of-speech/verb", spelling: "needs" },
  ],
  createdAt: "2026-10-19T17:57:50.086Z",
  updatedAt: "2026-10-19T17:57:50.086Z",
} as const satisfies CommonLanguageTerm
