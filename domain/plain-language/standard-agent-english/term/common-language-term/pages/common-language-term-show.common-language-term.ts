import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermShow = {
  id: "01a0d591-e5cf-71d2-830f-6b4201dc6773",
  type: "page-type/common-language-term",
  slug: "common-language-term-show",
  definition: "to put something where it can be seen",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "show" },
    { partOfSpeech: "part-of-speech/verb", spelling: "shows" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "shown" },
  ],
  createdAt: "2026-09-24T22:38:23.695Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
