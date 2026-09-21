import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const compass = {
  id: "01a0c626-dc04-7149-8c6a-948dec9da5f1",
  type: "page-type/common-language-term",
  slug: "compass",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "compass" }],
} as const satisfies CommonLanguageTerm
