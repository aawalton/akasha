import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const cancel = {
  id: "01a15581-43e3-7130-9bc6-498c1e00b42c",
  type: "page-type/common-language-term",
  slug: "cancel",
  definition: "calling something off",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "cancel" },
    { partOfSpeech: "part-of-speech/verb", spelling: "cancels" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "canceled" },
  ],
  createdAt: "2026-10-19T18:51:37.314Z",
  updatedAt: "2026-10-19T18:51:37.314Z",
} as const satisfies CommonLanguageTerm
