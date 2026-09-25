import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const another = {
  id: "01a0c5fe-cfe2-73d5-988b-e728212c0fd4",
  type: "page-type/common-language-term",
  slug: "another",
  spellings: [{ partOfSpeech: "part-of-speech/determiner", spelling: "another" }],
} as const satisfies CommonLanguageTerm
