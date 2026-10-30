import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const disc = {
  id: "01a18d9c-1f1d-7c68-b22e-9f9303ca1608",
  type: "page-type/common-language-term",
  slug: "disc",
  definition: "a part of a release that holds tracks",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "disc" },
    { partOfSpeech: "part-of-speech/noun", spelling: "discs" },
  ],
  createdAt: "2026-10-30T16:19:41.467Z",
  updatedAt: "2026-10-30T16:19:41.467Z",
} as const satisfies CommonLanguageTerm
