import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const give = {
  id: "01a18d45-1ad2-7da1-a4c6-6bbbe7fcb258",
  type: "page-type/common-language-term",
  slug: "give",
  definition: "handing something to someone",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "give" },
    { partOfSpeech: "part-of-speech/verb", spelling: "gives" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "given" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "giving" },
  ],
  createdAt: "2026-10-30T14:44:38.737Z",
  updatedAt: "2026-10-30T14:44:38.737Z",
} as const satisfies CommonLanguageTerm
