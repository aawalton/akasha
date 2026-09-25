import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const whether = {
  id: "01a0d3d1-bb26-72c2-9947-c180a086c7db",
  type: "page-type/common-language-term",
  slug: "whether",
  definition: "the word making a yes-or-no question of the clause after it",
  spellings: [{ partOfSpeech: "part-of-speech/subordinating-conjunction", spelling: "whether" }],
} as const satisfies CommonLanguageTerm
