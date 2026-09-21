import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const result = {
  id: "01a0c629-4620-700b-a396-f596bef976aa",
  type: "page-type/common-language-term",
  slug: "result",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "result" },
    { partOfSpeech: "part-of-speech/noun", spelling: "results" },
  ],
} as const satisfies CommonLanguageTerm
