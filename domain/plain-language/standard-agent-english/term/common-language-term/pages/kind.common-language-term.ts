import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const kind = {
  id: "01a18d37-443c-77c3-b9e6-8ed48f4ecb63",
  type: "page-type/common-language-term",
  slug: "kind",
  definition: "a group of things that are alike",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "kind" },
    { partOfSpeech: "part-of-speech/noun", spelling: "kinds" },
  ],
  createdAt: "2026-10-30T14:29:31.835Z",
  updatedAt: "2026-10-30T14:29:31.835Z",
} as const satisfies CommonLanguageTerm
