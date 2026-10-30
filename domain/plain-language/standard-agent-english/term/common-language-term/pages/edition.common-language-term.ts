import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const edition = {
  id: "01a18d57-546e-780d-bf4f-76e0d1c6edcb",
  type: "page-type/common-language-term",
  slug: "edition",
  definition: "a version of a book that is published",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "edition" },
    { partOfSpeech: "part-of-speech/noun", spelling: "editions" },
  ],
  createdAt: "2026-10-30T15:04:33.133Z",
  updatedAt: "2026-10-30T15:04:33.133Z",
} as const satisfies CommonLanguageTerm
