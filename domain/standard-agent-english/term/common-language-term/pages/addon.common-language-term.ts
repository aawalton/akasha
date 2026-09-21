import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const addon = {
  id: "01a0c629-57ba-7544-9472-7e31c637e891",
  type: "page-type/common-language-term",
  slug: "addon",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "addon" },
    { partOfSpeech: "part-of-speech/noun", spelling: "addons" },
  ],
} as const satisfies CommonLanguageTerm
