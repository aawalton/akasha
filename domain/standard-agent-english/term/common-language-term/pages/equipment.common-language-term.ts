import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const equipment = {
  id: "01a0c629-343c-775d-adb1-0a4cf544190b",
  type: "page-type/common-language-term",
  slug: "equipment",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "equipment" }],
} as const satisfies CommonLanguageTerm
