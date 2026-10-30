import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const interview = {
  id: "01a18d4b-9026-7d8c-abdb-768d76eb66f0",
  type: "page-type/common-language-term",
  slug: "interview",
  definition: "a meeting where one person asks another person questions",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "interview" },
    { partOfSpeech: "part-of-speech/noun", spelling: "interviews" },
  ],
  createdAt: "2026-10-30T14:51:41.988Z",
  updatedAt: "2026-10-30T14:51:41.988Z",
} as const satisfies CommonLanguageTerm
