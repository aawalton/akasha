import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermDo = {
  id: "01a0ca13-5429-76d0-ae9a-a6d764f1f8a2",
  type: "page-type/common-language-term",
  slug: "common-language-term-do",
  definition: "carrying out an act",
  spellings: [
    { partOfSpeech: "part-of-speech/present-participle", spelling: "doing" },
    { partOfSpeech: "part-of-speech/verb", spelling: "do" },
  ],
} as const satisfies CommonLanguageTerm
