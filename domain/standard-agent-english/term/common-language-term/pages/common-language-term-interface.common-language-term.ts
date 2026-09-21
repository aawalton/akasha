import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermInterface = {
  id: "01a0c62e-5f19-7d3a-ae4c-289068d6f564",
  type: "page-type/common-language-term",
  slug: "common-language-term-interface",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "interface" },
    { partOfSpeech: "part-of-speech/noun", spelling: "interfaces" },
  ],
} as const satisfies CommonLanguageTerm
