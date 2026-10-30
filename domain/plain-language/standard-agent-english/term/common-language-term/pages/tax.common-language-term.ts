import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const tax = {
  id: "01a18d63-cc76-772b-bb0a-0acad2af4907",
  type: "page-type/common-language-term",
  slug: "tax",
  definition: "money a government requires people to pay",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "tax" },
    { partOfSpeech: "part-of-speech/noun", spelling: "taxes" },
  ],
  createdAt: "2026-10-30T15:18:10.293Z",
  updatedAt: "2026-10-30T15:18:10.293Z",
} as const satisfies CommonLanguageTerm
