import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const who = {
  id: "01a0ca37-57d3-7eeb-9670-a6e3ffb02ea4",
  type: "page-type/common-language-term",
  slug: "who",
  definition: "the pronoun naming the person a clause leaves out",
  spellings: [{ partOfSpeech: "part-of-speech/free-relative-pronoun", spelling: "who" }],
  createdAt: "2026-09-22T17:43:39.731Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
