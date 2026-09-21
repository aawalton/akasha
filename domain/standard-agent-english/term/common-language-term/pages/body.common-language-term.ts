import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const body = {
  id: "01a0c600-4d26-79e6-a4c0-ad54b318c897",
  type: "page-type/common-language-term",
  slug: "body",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "body" }],
} as const satisfies CommonLanguageTerm
