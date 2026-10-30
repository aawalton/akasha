import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const restate = {
  id: "01a18d49-fee9-74e8-9fe1-b5573ed3f781",
  type: "page-type/common-language-term",
  slug: "restate",
  definition: "say again in other words",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "restate" },
    { partOfSpeech: "part-of-speech/verb", spelling: "restates" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "restated" },
  ],
  createdAt: "2026-10-30T14:49:59.272Z",
  updatedAt: "2026-10-30T14:49:59.272Z",
} as const satisfies CommonLanguageTerm
