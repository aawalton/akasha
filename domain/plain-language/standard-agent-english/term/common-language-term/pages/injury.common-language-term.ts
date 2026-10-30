import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const injury = {
  id: "01a18d8c-e4bd-7dfb-8b85-2c14e61d5eca",
  type: "page-type/common-language-term",
  slug: "injury",
  definition: "harm done to a person's body",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "injury" },
    { partOfSpeech: "part-of-speech/noun", spelling: "injuries" },
  ],
  createdAt: "2026-10-30T16:03:03.484Z",
  updatedAt: "2026-10-30T16:03:03.484Z",
} as const satisfies CommonLanguageTerm
