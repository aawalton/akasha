import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const library = {
  id: "01a0c623-839f-762c-9697-fa4c96aa9228",
  type: "page-type/common-language-term",
  slug: "library",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "library" },
    { partOfSpeech: "part-of-speech/noun", spelling: "libraries" },
  ],
} as const satisfies CommonLanguageTerm
