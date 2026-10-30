import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const tank = {
  id: "01a18d5d-e809-7ea9-8ac2-c17b4187ea58",
  type: "page-type/common-language-term",
  slug: "tank",
  definition: "a container that holds the fuel of a vehicle",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "tank" },
    { partOfSpeech: "part-of-speech/noun", spelling: "tanks" },
  ],
  createdAt: "2026-10-30T15:11:44.136Z",
  updatedAt: "2026-10-30T15:11:44.136Z",
} as const satisfies CommonLanguageTerm
