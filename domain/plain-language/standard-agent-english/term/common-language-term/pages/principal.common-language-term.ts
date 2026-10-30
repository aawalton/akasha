import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const principal = {
  id: "01a18d6c-3c32-7c15-9d3e-23f04524d3aa",
  type: "page-type/common-language-term",
  slug: "principal",
  definition: "the one an agent does work for",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "principal" },
    { partOfSpeech: "part-of-speech/noun", spelling: "principals" },
  ],
  createdAt: "2026-10-30T15:27:23.184Z",
  updatedAt: "2026-10-30T15:27:23.184Z",
} as const satisfies CommonLanguageTerm
