import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const half = {
  id: "01a0c624-b117-7c20-804e-aa2214714b44",
  type: "page-type/common-language-term",
  slug: "half",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "half" },
    { partOfSpeech: "part-of-speech/noun", spelling: "halves" },
  ],
} as const satisfies CommonLanguageTerm
