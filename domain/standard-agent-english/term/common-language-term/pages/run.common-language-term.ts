import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const run = {
  id: "01a0c622-42f1-7d60-bc4b-564d622a1e33",
  type: "page-type/common-language-term",
  slug: "run",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "run" },
    { partOfSpeech: "part-of-speech/noun", spelling: "runs" },
  ],
} as const satisfies CommonLanguageTerm
