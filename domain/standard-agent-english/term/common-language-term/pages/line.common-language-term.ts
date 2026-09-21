import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const line = {
  id: "01a0c624-09bd-7ee9-8ae3-04a198e441ec",
  type: "page-type/common-language-term",
  slug: "line",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "line" },
    { partOfSpeech: "part-of-speech/noun", spelling: "lines" },
  ],
} as const satisfies CommonLanguageTerm
