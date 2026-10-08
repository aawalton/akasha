import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const health = {
  id: "01a0d88e-d7dd-7a99-9942-478b29e58bd1",
  type: "page-type/common-language-term",
  slug: "health",
  definition: "how well a body works",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "health" }],
  createdAt: "2026-09-25T12:33:55.165Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
