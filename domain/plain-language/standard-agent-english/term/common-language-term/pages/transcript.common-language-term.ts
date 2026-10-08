import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const transcript = {
  id: "01a0d9cb-eff9-725a-a45a-e38703e9950a",
  type: "page-type/common-language-term",
  slug: "transcript",
  definition: "the written record of a conversation",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "transcript" },
    { partOfSpeech: "part-of-speech/noun", spelling: "transcripts" },
  ],
  createdAt: "2026-09-25T18:20:16.249Z",
  updatedAt: "2026-09-25T18:20:19.000Z",
} as const satisfies CommonLanguageTerm
