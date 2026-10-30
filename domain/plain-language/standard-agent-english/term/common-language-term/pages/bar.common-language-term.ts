import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const bar = {
  id: "01a18d60-5895-72c5-9ecd-00197a4ab2c3",
  type: "page-type/common-language-term",
  slug: "bar",
  definition: "a long narrow shape, such as one drawn filled in part to show an amount",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "bar" },
    { partOfSpeech: "part-of-speech/noun", spelling: "bars" },
  ],
  createdAt: "2026-10-30T15:14:24.019Z",
  updatedAt: "2026-10-30T15:14:24.019Z",
} as const satisfies CommonLanguageTerm
