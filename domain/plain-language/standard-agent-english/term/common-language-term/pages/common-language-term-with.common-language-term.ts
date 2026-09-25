import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermWith = {
  id: "01a0c58f-3091-74ee-a10b-0fa95c666781",
  type: "page-type/common-language-term",
  slug: "common-language-term-with",
  definition: "the preposition naming what goes along with a thing",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "with" }],
} as const satisfies CommonLanguageTerm
