import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const specification = {
  id: "01a0c602-a537-72ff-9eb8-e6912631b35c",
  type: "page-type/common-language-term",
  slug: "specification",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "specification" }],
} as const satisfies CommonLanguageTerm
