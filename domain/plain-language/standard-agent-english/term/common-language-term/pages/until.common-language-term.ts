import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const until = {
  id: "01a0d976-f4f0-7ca9-b5a5-38051bd004ad",
  type: "page-type/common-language-term",
  slug: "until",
  definition: "up to the time that",
  spellings: [{ partOfSpeech: "part-of-speech/subordinating-conjunction", spelling: "until" }],
} as const satisfies CommonLanguageTerm
