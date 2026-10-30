import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const link = {
  id: "01a18d5f-9259-717e-8b2c-d08da0eed7fa",
  type: "page-type/common-language-term",
  slug: "link",
  definition: "an address that opens a page on the web",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "link" },
    { partOfSpeech: "part-of-speech/noun", spelling: "links" },
  ],
  createdAt: "2026-10-30T15:13:33.271Z",
  updatedAt: "2026-10-30T15:13:33.271Z",
} as const satisfies CommonLanguageTerm
