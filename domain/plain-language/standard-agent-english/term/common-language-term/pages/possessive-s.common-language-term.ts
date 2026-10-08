import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const possessiveS = {
  id: "01a0c931-ac71-76fe-8fb9-542d2691996d",
  type: "page-type/common-language-term",
  slug: "possessive-s",
  definition: "the mark saying the noun after it belongs to the noun before it",
  spellings: [{ partOfSpeech: "part-of-speech/possessive-clitic", spelling: "'s" }],
  createdAt: "2026-09-22T12:57:50.961Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
