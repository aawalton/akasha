import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const software = {
  id: "01a18d4f-13ef-7334-8183-b14467613234",
  type: "page-type/common-language-term",
  slug: "software",
  definition: "the programs a machine runs",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "software" }],
  createdAt: "2026-10-30T14:55:32.331Z",
  updatedAt: "2026-10-30T14:55:32.331Z",
} as const satisfies CommonLanguageTerm
