import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const animated = {
  id: "01a0d48b-59fb-775a-be1c-347621b92eb7",
  type: "page-type/common-language-term",
  slug: "animated",
  definition: "made of drawings shown one after another so they seem to move",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "animated" }],
} as const satisfies CommonLanguageTerm
