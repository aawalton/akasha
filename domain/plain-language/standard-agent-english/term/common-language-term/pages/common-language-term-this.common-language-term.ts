import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermThis = {
  id: "01a0c62a-f3ea-71f1-815f-41d69fb02bd1",
  type: "page-type/common-language-term",
  slug: "common-language-term-this",
  spellings: [
    { partOfSpeech: "part-of-speech/determiner", spelling: "this" },
    { partOfSpeech: "part-of-speech/determiner", spelling: "these" },
  ],
} as const satisfies CommonLanguageTerm
