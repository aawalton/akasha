import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const next = {
  id: "01a0ca66-aa95-7a2b-860e-5df1fb232819",
  type: "page-type/common-language-term",
  slug: "next",
  definition: "coming straight after the one before it",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "next" }],
} as const satisfies CommonLanguageTerm
