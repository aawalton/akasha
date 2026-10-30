import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const length = {
  id: "01a18d4b-103d-7c28-8cfe-382fa69dbabe",
  type: "page-type/common-language-term",
  slug: "length",
  definition: "how long something is from one end to the other",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "length" },
    { partOfSpeech: "part-of-speech/noun", spelling: "lengths" },
  ],
  createdAt: "2026-10-30T14:51:09.243Z",
  updatedAt: "2026-10-30T14:51:09.243Z",
} as const satisfies CommonLanguageTerm
