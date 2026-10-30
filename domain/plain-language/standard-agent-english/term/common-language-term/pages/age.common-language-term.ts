import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const age = {
  id: "01a18d8f-9be2-7d53-9658-962bb49fb73a",
  type: "page-type/common-language-term",
  slug: "age",
  definition: "how many years a person has lived",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "age" },
    { partOfSpeech: "part-of-speech/noun", spelling: "ages" },
  ],
  createdAt: "2026-10-30T16:06:01.440Z",
  updatedAt: "2026-10-30T16:06:01.440Z",
} as const satisfies CommonLanguageTerm
