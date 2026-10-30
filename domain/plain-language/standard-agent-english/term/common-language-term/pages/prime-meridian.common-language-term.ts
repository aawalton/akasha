import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const primeMeridian = {
  id: "01a18d76-7963-7b77-a87d-701af4a4dc7e",
  type: "page-type/common-language-term",
  slug: "prime-meridian",
  definition: "the line from pole to pole that east and west are counted from",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "prime meridian" }],
  createdAt: "2026-10-30T15:38:34.206Z",
  updatedAt: "2026-10-30T15:38:34.206Z",
} as const satisfies CommonLanguageTerm
