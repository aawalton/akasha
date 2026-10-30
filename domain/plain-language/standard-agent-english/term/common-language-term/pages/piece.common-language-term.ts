import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const piece = {
  id: "01a18d50-b813-7184-ad36-ffdf1ed11744",
  type: "page-type/common-language-term",
  slug: "piece",
  definition: "a single item, as one of the things a set is made of or one work of music",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "piece" },
    { partOfSpeech: "part-of-speech/noun", spelling: "pieces" },
  ],
  createdAt: "2026-10-30T14:57:19.889Z",
  updatedAt: "2026-10-30T14:57:19.889Z",
} as const satisfies CommonLanguageTerm
