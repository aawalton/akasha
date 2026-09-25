import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const prepare = {
  id: "01a0d97a-1d5e-7201-9ae4-f4cf83c24e33",
  type: "page-type/common-language-term",
  slug: "prepare",
  definition: "to make ready",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "prepare" },
    { partOfSpeech: "part-of-speech/verb", spelling: "prepares" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "prepared" },
  ],
} as const satisfies CommonLanguageTerm
