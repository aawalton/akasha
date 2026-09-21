import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const live = {
  id: "01a0c5f9-9c68-75fe-b370-b70012584744",
  type: "page-type/common-language-term",
  slug: "live",
  definition: "the adjective naming a thing at work now rather than kept for later",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "live" }],
} as const satisfies CommonLanguageTerm
