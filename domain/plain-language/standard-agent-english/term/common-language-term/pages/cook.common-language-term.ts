import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const cook = {
  id: "01a18d5b-4b6a-7909-99b5-da56edbe8a16",
  type: "page-type/common-language-term",
  slug: "cook",
  definition: "makes food ready to eat",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "cook" },
    { partOfSpeech: "part-of-speech/verb", spelling: "cooks" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "cooked" },
  ],
  createdAt: "2026-10-30T15:08:52.969Z",
  updatedAt: "2026-10-30T15:08:52.969Z",
} as const satisfies CommonLanguageTerm
