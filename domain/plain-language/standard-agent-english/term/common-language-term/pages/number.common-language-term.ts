import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const number = {
  id: "01a18d6c-bf37-7b14-b2de-468488a68732",
  type: "page-type/common-language-term",
  slug: "number",
  definition: "an amount written in digits",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "number" },
    { partOfSpeech: "part-of-speech/noun", spelling: "numbers" },
  ],
  createdAt: "2026-10-30T15:27:56.725Z",
  updatedAt: "2026-10-30T15:27:56.725Z",
} as const satisfies CommonLanguageTerm
