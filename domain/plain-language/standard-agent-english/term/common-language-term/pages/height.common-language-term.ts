import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const height = {
  id: "01a18d4a-55a1-7800-a854-480f574d9dbb",
  type: "page-type/common-language-term",
  slug: "height",
  definition: "how tall something is from bottom to top",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "height" },
    { partOfSpeech: "part-of-speech/noun", spelling: "heights" },
  ],
  createdAt: "2026-10-30T14:50:21.472Z",
  updatedAt: "2026-10-30T14:50:21.472Z",
} as const satisfies CommonLanguageTerm
