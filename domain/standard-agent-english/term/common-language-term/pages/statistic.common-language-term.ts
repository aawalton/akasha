import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const statistic = {
  id: "01a0c62c-76b1-7666-aaa9-0372e28c43b8",
  type: "page-type/common-language-term",
  slug: "statistic",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "statistic" },
    { partOfSpeech: "part-of-speech/noun", spelling: "statistics" },
  ],
} as const satisfies CommonLanguageTerm
