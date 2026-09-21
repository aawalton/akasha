import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const popover = {
  id: "01a0c627-d76e-7547-9ed6-8274cd2e9f95",
  type: "page-type/common-language-term",
  slug: "popover",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "popover" },
    { partOfSpeech: "part-of-speech/noun", spelling: "popovers" },
  ],
} as const satisfies CommonLanguageTerm
