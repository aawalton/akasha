import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const hour = {
  id: "01a0d593-2752-70f3-bd36-414a4ea4502f",
  type: "page-type/common-language-term",
  slug: "hour",
  definition: "sixty minutes",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "hour" },
    { partOfSpeech: "part-of-speech/noun", spelling: "hours" },
  ],
} as const satisfies CommonLanguageTerm
