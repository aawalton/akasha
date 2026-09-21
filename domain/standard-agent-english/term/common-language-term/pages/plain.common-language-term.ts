import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const plain = {
  id: "01a0c5f9-89be-7429-aa48-c1835a65e3d3",
  type: "page-type/common-language-term",
  slug: "plain",
  definition: "the adjective naming a thing a reader takes with no extra step",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "plain" }],
} as const satisfies CommonLanguageTerm
