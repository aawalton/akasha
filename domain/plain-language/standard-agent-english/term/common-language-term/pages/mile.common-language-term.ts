import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const mile = {
  id: "01a18d5a-ec28-7e4d-b77b-59ca34708f3f",
  type: "page-type/common-language-term",
  slug: "mile",
  definition: "a length of about sixteen hundred meters",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "mile" },
    { partOfSpeech: "part-of-speech/noun", spelling: "miles" },
  ],
  createdAt: "2026-10-30T15:08:28.582Z",
  updatedAt: "2026-10-30T15:08:28.582Z",
} as const satisfies CommonLanguageTerm
