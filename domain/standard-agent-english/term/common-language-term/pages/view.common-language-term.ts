import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const view = {
  id: "01a0c603-1462-7c25-abd7-54d2309778f4",
  type: "page-type/common-language-term",
  slug: "view",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "view" }],
} as const satisfies CommonLanguageTerm
