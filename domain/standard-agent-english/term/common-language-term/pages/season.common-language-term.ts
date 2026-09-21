import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const season = {
  id: "01a0c602-357f-7832-b923-6407105b27d7",
  type: "page-type/common-language-term",
  slug: "season",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "season" }],
} as const satisfies CommonLanguageTerm
