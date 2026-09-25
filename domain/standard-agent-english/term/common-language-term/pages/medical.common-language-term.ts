import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const medical = {
  id: "01a0d89d-c486-765f-a747-3484622499fd",
  type: "page-type/common-language-term",
  slug: "medical",
  definition: "about treating illness",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "medical" }],
} as const satisfies CommonLanguageTerm
