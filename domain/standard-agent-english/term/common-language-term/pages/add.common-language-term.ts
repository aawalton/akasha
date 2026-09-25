import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const add = {
  id: "01a0d8c7-ce49-7d7f-8b9c-e4e2b77de92e",
  type: "page-type/common-language-term",
  slug: "add",
  definition: "to put something in with what is there",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "add" },
    { partOfSpeech: "part-of-speech/verb", spelling: "adds" },
  ],
} as const satisfies CommonLanguageTerm
