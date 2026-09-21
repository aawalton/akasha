import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const minimap = {
  id: "01a0c626-ed35-7f12-bfec-8c17cb5d5cdb",
  type: "page-type/common-language-term",
  slug: "minimap",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "minimap" }],
} as const satisfies CommonLanguageTerm
