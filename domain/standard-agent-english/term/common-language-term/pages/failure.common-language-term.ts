import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const failure = {
  id: "01a0d8e3-9aa0-7964-9b90-62a0be925a8b",
  type: "page-type/common-language-term",
  slug: "failure",
  definition: "a time something does not work",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "failure" },
    { partOfSpeech: "part-of-speech/noun", spelling: "failures" },
  ],
} as const satisfies CommonLanguageTerm
