import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const object = {
  id: "01a0c624-c27c-7fc6-9558-e207bdf07b46",
  type: "page-type/common-language-term",
  slug: "object",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "object" },
    { partOfSpeech: "part-of-speech/noun", spelling: "objects" },
  ],
} as const satisfies CommonLanguageTerm
