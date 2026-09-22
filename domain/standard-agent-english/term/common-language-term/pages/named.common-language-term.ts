import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const named = {
  id: "01a0c9e9-39bc-76ec-b647-2a12495fa888",
  type: "page-type/common-language-term",
  slug: "named",
  definition: "having a name of its own",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "named" }],
} as const satisfies CommonLanguageTerm
