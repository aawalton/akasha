import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const stored = {
  id: "01a0c9b1-6dc0-7847-affd-01e139b4cc0d",
  type: "page-type/common-language-term",
  slug: "stored",
  definition: "put in a store and left there",
  spellings: [
    { partOfSpeech: "part-of-speech/past-participle", spelling: "stored" },
    { partOfSpeech: "part-of-speech/adjective", spelling: "stored" },
  ],
} as const satisfies CommonLanguageTerm
