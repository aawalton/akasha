import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const streetAddress = {
  id: "01a18d62-e11d-781d-a592-6256ef98005d",
  type: "page-type/common-language-term",
  slug: "street-address",
  definition: "the road and the number where a place sits",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "street address" },
    { partOfSpeech: "part-of-speech/noun", spelling: "street addresses" },
  ],
  createdAt: "2026-10-30T15:17:10.043Z",
  updatedAt: "2026-10-30T15:17:10.043Z",
} as const satisfies CommonLanguageTerm
