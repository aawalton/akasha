import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const server = {
  id: "01a18d7a-1eb4-77fe-ad68-7905ebec6b80",
  type: "page-type/common-language-term",
  slug: "server",
  definition: "a program that responds to requests",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "server" },
    { partOfSpeech: "part-of-speech/noun", spelling: "servers" },
  ],
  createdAt: "2026-10-30T15:42:33.138Z",
  updatedAt: "2026-10-30T15:42:33.138Z",
} as const satisfies CommonLanguageTerm
