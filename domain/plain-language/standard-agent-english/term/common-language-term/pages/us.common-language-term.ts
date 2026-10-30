import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const us = {
  id: "01a18d91-fd79-750c-9bb0-652cb98c1661",
  type: "page-type/common-language-term",
  slug: "us",
  definition: "the United States of America",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "US" }],
  createdAt: "2026-10-30T16:08:37.496Z",
  updatedAt: "2026-10-30T16:08:37.496Z",
} as const satisfies CommonLanguageTerm
