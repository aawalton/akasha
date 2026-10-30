import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const emailAddress = {
  id: "01a18d6e-ade6-709d-8829-583788f87755",
  type: "page-type/common-language-term",
  slug: "email-address",
  definition: "where email to a person is sent",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "email address" },
    { partOfSpeech: "part-of-speech/noun", spelling: "email addresses" },
  ],
  createdAt: "2026-10-30T15:30:03.365Z",
  updatedAt: "2026-10-30T15:30:03.365Z",
} as const satisfies CommonLanguageTerm
