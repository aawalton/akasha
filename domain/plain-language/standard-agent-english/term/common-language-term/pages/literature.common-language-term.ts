import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const literature = {
  id: "01a0d89c-2b24-7024-a195-aa14e3ed0e21",
  type: "page-type/common-language-term",
  slug: "literature",
  definition: "writing valued as art",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "literature" }],
} as const satisfies CommonLanguageTerm
