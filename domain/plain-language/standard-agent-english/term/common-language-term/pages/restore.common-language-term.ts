import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const restore = {
  id: "01a18d75-95d9-7b54-a9b1-2b1ae9919ed8",
  type: "page-type/common-language-term",
  slug: "restore",
  definition: "to bring a thing back to how it was",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "restore" },
    { partOfSpeech: "part-of-speech/verb", spelling: "restores" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "restored" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "restoring" },
  ],
  createdAt: "2026-10-30T15:37:35.960Z",
  updatedAt: "2026-10-30T15:37:35.960Z",
} as const satisfies CommonLanguageTerm
