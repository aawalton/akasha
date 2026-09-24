import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const timer = {
  id: "01a0d46a-91c1-7fc1-8982-995a79b0923d",
  type: "page-type/common-language-term",
  slug: "timer",
  definition: "a thing that sets work going again and again after a fixed time",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "timer" },
    { partOfSpeech: "part-of-speech/noun", spelling: "timers" },
  ],
} as const satisfies CommonLanguageTerm
