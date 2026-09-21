import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const commonLanguageTermClass = {
  id: "01a0c62a-36ff-72df-938f-3b117780bbac",
  type: "page-type/common-language-term",
  slug: "common-language-term-class",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "class" },
    { partOfSpeech: "part-of-speech/noun", spelling: "classes" },
  ],
} as const satisfies CommonLanguageTerm
