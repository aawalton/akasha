import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermNew = {
  id: "01a0d596-a3a7-763c-86d4-bfa231b35375",
  type: "page-type/common-language-term",
  slug: "common-language-term-new",
  definition: "not there until now",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "new" }],
} as const satisfies CommonLanguageTerm
