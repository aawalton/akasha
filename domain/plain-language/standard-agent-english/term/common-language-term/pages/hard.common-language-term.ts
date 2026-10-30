import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const hard = {
  id: "01a18d73-4943-72bc-ad4f-a9a6cc6f856e",
  type: "page-type/common-language-term",
  slug: "hard",
  definition: "taking much effort to do",
  spellings: [
    { partOfSpeech: "part-of-speech/adjective", spelling: "hard" },
    { partOfSpeech: "part-of-speech/adjective", spelling: "harder" },
  ],
  createdAt: "2026-10-30T15:35:05.275Z",
  updatedAt: "2026-10-30T15:35:05.275Z",
} as const satisfies CommonLanguageTerm
