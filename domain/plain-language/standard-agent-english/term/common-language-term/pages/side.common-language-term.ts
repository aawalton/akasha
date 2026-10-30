import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const side = {
  id: "01a18d53-af21-7176-9b6c-55393acc70b4",
  type: "page-type/common-language-term",
  slug: "side",
  definition: "the left or right part of a thing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "side" },
    { partOfSpeech: "part-of-speech/noun", spelling: "sides" },
  ],
  createdAt: "2026-10-30T15:00:34.208Z",
  updatedAt: "2026-10-30T15:00:34.208Z",
} as const satisfies CommonLanguageTerm
