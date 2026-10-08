import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const the = {
  id: "01a0c583-0463-76e9-a296-f736c56ccb9f",
  type: "page-type/common-language-term",
  slug: "the",
  definition: "the determiner written where the reader can tell which thing is named",
  spellings: [{ partOfSpeech: "part-of-speech/determiner", spelling: "the" }],
  createdAt: "2026-09-21T19:48:13.027Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
