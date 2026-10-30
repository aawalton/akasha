import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const source = {
  id: "01a18d75-fa46-744e-8e7f-c416986ba42d",
  type: "page-type/common-language-term",
  slug: "source",
  definition: "where a thing comes from",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "source" },
    { partOfSpeech: "part-of-speech/noun", spelling: "sources" },
  ],
  createdAt: "2026-10-30T15:38:01.669Z",
  updatedAt: "2026-10-30T15:38:01.669Z",
} as const satisfies CommonLanguageTerm
