import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const trust = {
  id: "01a18d46-c403-7a12-98f5-d1471d26012c",
  type: "page-type/common-language-term",
  slug: "trust",
  definition: "to rely on something as safe or true",
  spellings: [
    { partOfSpeech: "part-of-speech/verb", spelling: "trust" },
    { partOfSpeech: "part-of-speech/verb", spelling: "trusts" },
    { partOfSpeech: "part-of-speech/past-participle", spelling: "trusted" },
    { partOfSpeech: "part-of-speech/noun", spelling: "trust" },
  ],
  createdAt: "2026-10-30T14:46:27.587Z",
  updatedAt: "2026-10-30T14:46:27.587Z",
} as const satisfies CommonLanguageTerm
