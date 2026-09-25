import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const choose = {
  id: "01a0ca4b-aae2-758e-bbbe-c3d339ac1476",
  type: "page-type/common-language-term",
  slug: "choose",
  definition: "settling which one it is, as somebody takes the one they want",
  spellings: [
    { partOfSpeech: "part-of-speech/past-participle", spelling: "chosen" },
    { partOfSpeech: "part-of-speech/verb", spelling: "chooses" },
  ],
} as const satisfies CommonLanguageTerm
