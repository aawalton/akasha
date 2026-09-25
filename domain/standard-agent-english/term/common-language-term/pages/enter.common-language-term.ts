import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const enter = {
  id: "01a0d905-f337-7764-9e96-bf94f662c55a",
  type: "page-type/common-language-term",
  slug: "enter",
  definition: "to put in",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "enter" },
    { partOfSpeech: "part-of-speech/verb", spelling: "enters" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "entered" },
  ],
} as const satisfies CommonLanguageTerm
