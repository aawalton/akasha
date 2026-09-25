import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermImport = {
  id: "01a0d5b8-6729-7b89-8135-d3fa749c6c4f",
  type: "page-type/common-language-term",
  slug: "common-language-term-import",
  definition: "to bring something in from outside",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "import" },
    { partOfSpeech: "part-of-speech/verb", spelling: "imports" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "imported" },
  ],
} as const satisfies CommonLanguageTerm
