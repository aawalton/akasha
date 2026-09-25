import type { ForeignNameTerm } from "akasha/domain/plain-language/standard-agent-english/term/foreign-name-term/foreign-name-term.page-type.types.ts"

export const kubectl = {
  id: "01a0c601-fd2d-778f-b163-16487fa964e0",
  type: "page-type/foreign-name-term",
  slug: "kubectl",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "kubectl" }],
} as const satisfies ForeignNameTerm
