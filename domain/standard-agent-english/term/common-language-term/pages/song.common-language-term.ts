import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const song = {
  id: "01a0c602-93f2-7c01-b046-6309900a23ac",
  type: "page-type/common-language-term",
  slug: "song",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "song" }],
} as const satisfies CommonLanguageTerm
