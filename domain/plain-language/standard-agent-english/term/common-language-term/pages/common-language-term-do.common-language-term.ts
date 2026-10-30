import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermDo = {
  id: "01a0ca13-5429-76d0-ae9a-a6d764f1f8a2",
  type: "page-type/common-language-term",
  slug: "common-language-term-do",
  definition: "carrying out an act",
  spellings: [
    { partOfSpeech: "part-of-speech/present-participle", spelling: "doing" },
    { partOfSpeech: "part-of-speech/verb", spelling: "do" },
    { partOfSpeech: "part-of-speech/verb", spelling: "does" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "done" },
    { partOfSpeech: "part-of-speech/do-verb", spelling: "do" },
    { partOfSpeech: "part-of-speech/do-verb", spelling: "does" },
  ],
  createdAt: "2026-09-22T17:04:19.497Z",
  updatedAt: "2026-10-30T15:50:45.938Z",
} as const satisfies CommonLanguageTerm
