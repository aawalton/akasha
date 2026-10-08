import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const something = {
  id: "01a0d8f5-82cf-76f5-bd17-6e0e1f36dc30",
  type: "page-type/common-language-term",
  slug: "something",
  definition: "a thing not named",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "something" }],
  createdAt: "2026-09-25T14:26:03.599Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
