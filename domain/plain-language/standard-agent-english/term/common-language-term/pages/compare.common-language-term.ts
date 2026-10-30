import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const compare = {
  id: "01a18d78-09f1-78e5-baf4-493812704b91",
  type: "page-type/common-language-term",
  slug: "compare",
  definition: "to look at two things to see how they differ",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "compare" },
    { partOfSpeech: "part-of-speech/verb", spelling: "compares" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "compared" },
  ],
  createdAt: "2026-10-30T15:40:16.752Z",
  updatedAt: "2026-10-30T15:40:16.752Z",
} as const satisfies CommonLanguageTerm
