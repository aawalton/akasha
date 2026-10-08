import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const measurement = {
  id: "01a0d5b8-6729-7ffc-93a7-5dd758e2efd4",
  type: "page-type/common-language-term",
  slug: "measurement",
  definition: "an amount found by measuring",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "measurement" },
    { partOfSpeech: "part-of-speech/noun", spelling: "measurements" },
  ],
  createdAt: "2026-09-24T23:20:27.177Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
