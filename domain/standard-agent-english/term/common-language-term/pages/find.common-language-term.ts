import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const find = {
  id: "01a0d5b8-6729-70f9-9e84-db296e8badd4",
  type: "page-type/common-language-term",
  slug: "find",
  definition: "to come upon what was looked for",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "find" },
    { partOfSpeech: "part-of-speech/verb", spelling: "finds" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "found" },
  ],
} as const satisfies CommonLanguageTerm
