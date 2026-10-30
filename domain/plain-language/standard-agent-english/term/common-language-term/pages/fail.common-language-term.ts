import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const fail = {
  id: "01a18d5e-fdf9-7090-85f0-19ab5da8d8cd",
  type: "page-type/common-language-term",
  slug: "fail",
  definition: "to not do what was meant to be done",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "fail" },
    { partOfSpeech: "part-of-speech/verb", spelling: "fails" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "failed" },
    { partOfSpeech: "part-of-speech/present-participle", spelling: "failing" },
  ],
  createdAt: "2026-10-30T15:12:55.287Z",
  updatedAt: "2026-10-30T15:12:55.287Z",
} as const satisfies CommonLanguageTerm
