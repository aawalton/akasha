import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermAny = {
  id: "01a0c62b-2b3c-7a22-a106-80ebf3809b8b",
  type: "page-type/common-language-term",
  slug: "common-language-term-any",
  spellings: [{ partOfSpeech: "part-of-speech/determiner", spelling: "any" }],
} as const satisfies CommonLanguageTerm
