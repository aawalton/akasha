import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const sample = {
  id: "01a0c629-22e1-74e1-9666-1ececb675545",
  type: "page-type/common-language-term",
  slug: "sample",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "sample" },
    { partOfSpeech: "part-of-speech/noun", spelling: "samples" },
  ],
} as const satisfies CommonLanguageTerm
