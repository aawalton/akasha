import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const catalogue = {
  id: "01a18d63-f3e1-7cf8-abcb-bbda4f864013",
  type: "page-type/common-language-term",
  slug: "catalogue",
  definition: "a full list of the items of one kind",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "catalogue" },
    { partOfSpeech: "part-of-speech/noun", spelling: "catalogues" },
  ],
  createdAt: "2026-10-30T15:18:20.384Z",
  updatedAt: "2026-10-30T15:18:20.384Z",
} as const satisfies CommonLanguageTerm
