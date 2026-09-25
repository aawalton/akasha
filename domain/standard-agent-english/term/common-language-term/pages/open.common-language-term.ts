import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const open = {
  id: "01a0d8de-7e9b-7398-8ff7-83b9ff775e8e",
  type: "page-type/common-language-term",
  slug: "open",
  definition: "to make something ready to be used or seen",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "open" },
    { partOfSpeech: "part-of-speech/verb", spelling: "opens" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "opened" },
  ],
} as const satisfies CommonLanguageTerm
