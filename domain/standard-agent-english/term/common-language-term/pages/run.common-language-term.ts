import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const run = {
  id: "01a0c937-9efa-79dc-ab59-21f33ba7362a",
  type: "page-type/common-language-term",
  slug: "run",
  definition: "a program taken from beginning to end, and the taking of a program that way",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "run" },
    { partOfSpeech: "part-of-speech/verb", spelling: "runs" },
    { partOfSpeech: "part-of-speech/noun", spelling: "run" },
    { partOfSpeech: "part-of-speech/noun", spelling: "runs" },
  ],
} as const satisfies CommonLanguageTerm
