import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const what = {
  id: "01a0c691-ce38-72d7-ac96-79664241142e",
  type: "page-type/common-language-term",
  slug: "what",
  definition: "the pronoun naming the thing a clause leaves out",
  spellings: [{ partOfSpeech: "part-of-speech/free-relative-pronoun", spelling: "what" }],
} as const satisfies CommonLanguageTerm
