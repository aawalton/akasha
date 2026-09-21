import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const key = {
  id: "01a0c626-9246-78b8-ba78-442b7f9825af",
  type: "page-type/common-language-term",
  slug: "key",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "key" },
    { partOfSpeech: "part-of-speech/noun", spelling: "keys" },
  ],
} as const satisfies CommonLanguageTerm
