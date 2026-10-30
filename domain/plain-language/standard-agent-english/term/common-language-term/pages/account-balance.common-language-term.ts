import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const accountBalance = {
  id: "01a18d82-3fb3-7d05-b992-14b0bb344982",
  type: "page-type/common-language-term",
  slug: "account-balance",
  definition: "the money an account holds",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "account balance" },
    { partOfSpeech: "part-of-speech/noun", spelling: "account balances" },
  ],
  createdAt: "2026-10-30T15:51:25.873Z",
  updatedAt: "2026-10-30T15:51:25.873Z",
} as const satisfies CommonLanguageTerm
