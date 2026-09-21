import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const skyshard = {
  id: "01a0c625-ea61-7af9-8c26-6c9859ca0afe",
  type: "page-type/common-language-term",
  slug: "skyshard",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "skyshard" },
    { partOfSpeech: "part-of-speech/noun", spelling: "skyshards" },
  ],
} as const satisfies CommonLanguageTerm
