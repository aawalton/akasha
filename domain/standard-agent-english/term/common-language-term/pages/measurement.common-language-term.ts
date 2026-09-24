import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const measurement = {
  id: "01a0d5b8-6729-7ffc-93a7-5dd758e2efd4",
  type: "page-type/common-language-term",
  slug: "measurement",
  definition: "an amount found by measuring",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "measurement" },
    { partOfSpeech: "part-of-speech/noun", spelling: "measurements" },
  ],
} as const satisfies CommonLanguageTerm
