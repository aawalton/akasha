import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const kind = {
  id: "01a0c601-b548-71b4-b34e-5b553af84e0f",
  type: "page-type/common-language-term",
  slug: "kind",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "kind" }],
} as const satisfies CommonLanguageTerm
