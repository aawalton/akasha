import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const before = {
  id: "01a0d921-6a6c-7fa9-bc79-dff458968322",
  type: "page-type/common-language-term",
  slug: "before",
  definition: "earlier than",
  spellings: [{ partOfSpeech: "part-of-speech/preposition", spelling: "before" }],
} as const satisfies CommonLanguageTerm
