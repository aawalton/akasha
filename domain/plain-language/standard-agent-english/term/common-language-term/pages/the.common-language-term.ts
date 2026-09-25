import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const the = {
  id: "01a0c583-0463-76e9-a296-f736c56ccb9f",
  type: "page-type/common-language-term",
  slug: "the",
  definition: "the determiner written where the reader can tell which thing is named",
  spellings: [{ partOfSpeech: "part-of-speech/determiner", spelling: "the" }],
} as const satisfies CommonLanguageTerm
