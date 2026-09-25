import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const every = {
  id: "01a0c62b-193a-7821-886d-058bd6228718",
  type: "page-type/common-language-term",
  slug: "every",
  spellings: [{ partOfSpeech: "part-of-speech/determiner", spelling: "every" }],
} as const satisfies CommonLanguageTerm
