import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const current = {
  id: "01a0d41c-1b12-736a-baed-12f2361fcc74",
  type: "page-type/common-language-term",
  slug: "current",
  definition: "the one in effect now, with nothing newer",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "current" }],
} as const satisfies CommonLanguageTerm
