import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const standardError = {
  id: "01a15554-a687-7f6a-a20d-91cb378c3163",
  type: "page-type/common-language-term",
  slug: "standard-error",
  definition: "the stream a program writes its errors and logs to",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "standard error" }],
  createdAt: "2026-10-19T18:02:53.446Z",
  updatedAt: "2026-10-19T18:02:53.446Z",
} as const satisfies CommonLanguageTerm
