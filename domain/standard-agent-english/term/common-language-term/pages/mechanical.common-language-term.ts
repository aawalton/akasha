import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const mechanical = {
  id: "01a0c5f9-6259-7bec-aa2f-a7e70ba61f97",
  type: "page-type/common-language-term",
  slug: "mechanical",
  definition: "the adjective naming a thing done by a machine rather than by a person",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "mechanical" }],
} as const satisfies CommonLanguageTerm
