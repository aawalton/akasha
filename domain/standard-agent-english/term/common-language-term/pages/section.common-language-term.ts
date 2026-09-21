import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const section = {
  id: "01a0c627-fc58-7eb1-a76f-5067afde157c",
  type: "page-type/common-language-term",
  slug: "section",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "section" },
    { partOfSpeech: "part-of-speech/noun", spelling: "sections" },
  ],
} as const satisfies CommonLanguageTerm
