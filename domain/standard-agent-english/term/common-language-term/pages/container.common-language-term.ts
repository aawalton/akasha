import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const container = {
  id: "01a0c629-b324-7a89-bd72-f35bb9969cde",
  type: "page-type/common-language-term",
  slug: "container",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "container" },
    { partOfSpeech: "part-of-speech/noun", spelling: "containers" },
  ],
} as const satisfies CommonLanguageTerm
