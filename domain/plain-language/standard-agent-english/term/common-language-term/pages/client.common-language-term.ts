import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const client = {
  id: "01a18d78-a06f-702f-8f8f-8f8443ef902a",
  type: "page-type/common-language-term",
  slug: "client",
  definition: "a program that calls a service",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "client" },
    { partOfSpeech: "part-of-speech/noun", spelling: "clients" },
  ],
  createdAt: "2026-10-30T15:40:55.278Z",
  updatedAt: "2026-10-30T15:40:55.278Z",
} as const satisfies CommonLanguageTerm
