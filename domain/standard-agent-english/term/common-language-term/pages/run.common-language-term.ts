import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const run = {
  id: "01a0c937-9efa-79dc-ab59-21f33ba7362a",
  type: "page-type/common-language-term",
  slug: "run",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "run" },
    { partOfSpeech: "part-of-speech/verb", spelling: "runs" },
  ],
} as const satisfies CommonLanguageTerm
