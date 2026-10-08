import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const requestHeader = {
  id: "01a0d9d6-af05-77d0-a020-336d005a9bf8",
  type: "page-type/common-language-term",
  slug: "request-header",
  definition: "a named value sent at the top of a request",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "request header" },
    { partOfSpeech: "part-of-speech/noun", spelling: "request headers" },
  ],
  createdAt: "2026-09-25T18:32:00.517Z",
  updatedAt: "2026-09-25T18:32:03.000Z",
} as const satisfies CommonLanguageTerm
