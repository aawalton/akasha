import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const copy = {
  id: "01a0d9d7-f9cc-732b-a257-0882531446c0",
  type: "page-type/common-language-term",
  slug: "copy",
  definition: "makes a second of the same thing",
  spellings: [{ partOfSpeech: "part-of-speech/verb", spelling: "copies" }],
} as const satisfies CommonLanguageTerm
