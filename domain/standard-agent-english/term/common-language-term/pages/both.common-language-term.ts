import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const both = {
  id: "01a0c62b-4efc-7e13-9086-1ecef6d4a206",
  type: "page-type/common-language-term",
  slug: "both",
  spellings: [{ partOfSpeech: "part-of-speech/determiner", spelling: "both" }],
} as const satisfies CommonLanguageTerm
