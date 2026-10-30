import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const plug = {
  id: "01a18d53-2406-7601-b9d3-e6ecfc9f46ad",
  type: "page-type/common-language-term",
  slug: "plug",
  definition: "the end of a cable that is pushed into a socket",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "plug" },
    { partOfSpeech: "part-of-speech/noun", spelling: "plugs" },
  ],
  createdAt: "2026-10-30T14:59:58.597Z",
  updatedAt: "2026-10-30T14:59:58.597Z",
} as const satisfies CommonLanguageTerm
