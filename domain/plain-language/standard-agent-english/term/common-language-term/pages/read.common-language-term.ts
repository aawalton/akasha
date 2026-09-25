import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const read = {
  id: "01a0c941-5635-7b48-b57a-106d6b043b46",
  type: "page-type/common-language-term",
  slug: "read",
  definition: "taking in what is written, as a book or a file is taken in",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "read" },
    { partOfSpeech: "part-of-speech/verb", spelling: "reads" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "read" },
  ],
} as const satisfies CommonLanguageTerm
