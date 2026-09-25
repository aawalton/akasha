import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const plain = {
  id: "01a0d926-344d-79f5-adf2-7d4e4b527d46",
  type: "page-type/common-language-term",
  slug: "plain",
  definition: "easy to understand, with nothing added",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "plain" }],
} as const satisfies CommonLanguageTerm
