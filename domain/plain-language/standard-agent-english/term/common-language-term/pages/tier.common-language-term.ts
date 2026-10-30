import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const tier = {
  id: "01a18d46-da29-725f-a454-0815a23f7ef5",
  type: "page-type/common-language-term",
  slug: "tier",
  definition: "one level in a ranking",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "tier" },
    { partOfSpeech: "part-of-speech/noun", spelling: "tiers" },
  ],
  createdAt: "2026-10-30T14:46:33.256Z",
  updatedAt: "2026-10-30T14:46:33.256Z",
} as const satisfies CommonLanguageTerm
