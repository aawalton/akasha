import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const one = {
  id: "01a0c5fe-a8c5-7669-ab52-aff2b82d0645",
  type: "page-type/common-language-term",
  slug: "one",
  spellings: [{ partOfSpeech: "part-of-speech/determiner", spelling: "one" }],
} as const satisfies CommonLanguageTerm
