import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const addressBook = {
  id: "01a18d6f-0e39-77d3-a7fd-6ecf60927e53",
  type: "page-type/common-language-term",
  slug: "address-book",
  definition: "a list of people with the phone numbers and email addresses of each person",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "address book" },
    { partOfSpeech: "part-of-speech/noun", spelling: "address books" },
  ],
  createdAt: "2026-10-30T15:30:28.023Z",
  updatedAt: "2026-10-30T15:30:28.023Z",
} as const satisfies CommonLanguageTerm
