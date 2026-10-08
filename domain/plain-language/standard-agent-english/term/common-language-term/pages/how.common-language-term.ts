import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const how = {
  id: "01a0ca44-2ff9-779f-9be1-f8324f165666",
  type: "page-type/common-language-term",
  slug: "how",
  definition: "the pronoun naming the way a clause leaves out",
  spellings: [
    { partOfSpeech: "part-of-speech/free-relative-pronoun", spelling: "how" },
    { partOfSpeech: "part-of-speech/degree-adverb", spelling: "how" },
  ],
  createdAt: "2026-09-22T17:57:41.497Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
