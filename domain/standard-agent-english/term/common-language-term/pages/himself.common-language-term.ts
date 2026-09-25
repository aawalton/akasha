import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const himself = {
  id: "01a0d8ae-8d53-7f66-bd61-01acfbd9571d",
  type: "page-type/common-language-term",
  slug: "himself",
  definition: "the man a sentence is about, named again",
  spellings: [{ partOfSpeech: "part-of-speech/reflexive-pronoun", spelling: "himself" }],
} as const satisfies CommonLanguageTerm
