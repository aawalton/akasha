import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const instrument = {
  id: "01a0c601-8ef4-7ff9-9585-f7a2a066ffba",
  type: "page-type/common-language-term",
  slug: "instrument",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "instrument" }],
} as const satisfies CommonLanguageTerm
