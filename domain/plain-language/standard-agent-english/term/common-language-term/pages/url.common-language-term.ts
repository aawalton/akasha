import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const url = {
  id: "01a18da3-79ea-7604-b415-36a41e5221ff",
  type: "page-type/common-language-term",
  slug: "url",
  definition: "where a browser finds a thing",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "URL" },
    { partOfSpeech: "part-of-speech/noun", spelling: "URLs" },
  ],
  createdAt: "2026-10-30T16:27:43.465Z",
  updatedAt: "2026-10-30T16:27:43.465Z",
} as const satisfies CommonLanguageTerm
