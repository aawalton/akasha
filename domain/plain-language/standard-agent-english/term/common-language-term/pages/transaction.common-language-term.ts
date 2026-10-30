import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const transaction = {
  id: "01a18d77-129f-7183-90aa-3e28dcf9d269",
  type: "page-type/common-language-term",
  slug: "transaction",
  definition: "a movement of money into or out of an account",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "transaction" },
    { partOfSpeech: "part-of-speech/noun", spelling: "transactions" },
  ],
  createdAt: "2026-10-30T15:39:13.438Z",
  updatedAt: "2026-10-30T15:39:13.438Z",
} as const satisfies CommonLanguageTerm
