import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const when = {
  id: "01a0d595-12b9-7717-b947-292f0af78342",
  type: "page-type/common-language-term",
  slug: "when",
  definition: "the pronoun naming the time a clause leaves out",
  spellings: [{ partOfSpeech: "part-of-speech/free-relative-pronoun", spelling: "when" }],
} as const satisfies CommonLanguageTerm
