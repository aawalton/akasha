import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const degree = {
  id: "01a18d76-7961-71a4-a791-ec31804f5310",
  type: "page-type/common-language-term",
  slug: "degree",
  definition: "a unit of angle or of heat",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "degree" },
    { partOfSpeech: "part-of-speech/noun", spelling: "degrees" },
  ],
  createdAt: "2026-10-30T15:38:34.206Z",
  updatedAt: "2026-10-30T15:38:34.206Z",
} as const satisfies CommonLanguageTerm
