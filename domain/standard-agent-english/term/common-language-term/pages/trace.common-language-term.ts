import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const trace = {
  id: "01a0c62c-c281-7fc1-bf7e-5ad71ce1a010",
  type: "page-type/common-language-term",
  slug: "trace",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "trace" },
    { partOfSpeech: "part-of-speech/noun", spelling: "traces" },
  ],
} as const satisfies CommonLanguageTerm
