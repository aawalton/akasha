import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const kilowatt = {
  id: "01a18d48-4501-757a-bf07-2422ca6daef2",
  type: "page-type/common-language-term",
  slug: "kilowatt",
  definition: "a unit of power of a thousand watts",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "kilowatt" },
    { partOfSpeech: "part-of-speech/noun", spelling: "kilowatts" },
  ],
  createdAt: "2026-10-30T14:48:06.142Z",
  updatedAt: "2026-10-30T14:48:06.142Z",
} as const satisfies CommonLanguageTerm
