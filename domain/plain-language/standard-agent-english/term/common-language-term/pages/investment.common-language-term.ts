import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const investment = {
  id: "01a18d77-8f8f-7607-89ff-b9e0e5c043a8",
  type: "page-type/common-language-term",
  slug: "investment",
  definition: "a fund or stock that money is put into to grow",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "investment" },
    { partOfSpeech: "part-of-speech/noun", spelling: "investments" },
  ],
  createdAt: "2026-10-30T15:39:45.420Z",
  updatedAt: "2026-10-30T15:39:45.420Z",
} as const satisfies CommonLanguageTerm
