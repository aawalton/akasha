import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const lecture = {
  id: "01a18d5d-e822-7194-a92c-a227fa7a969b",
  type: "page-type/common-language-term",
  slug: "lecture",
  definition: "a talk that teaches a topic",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "lecture" },
    { partOfSpeech: "part-of-speech/noun", spelling: "lectures" },
  ],
  createdAt: "2026-10-30T15:11:44.161Z",
  updatedAt: "2026-10-30T15:11:44.161Z",
} as const satisfies CommonLanguageTerm
