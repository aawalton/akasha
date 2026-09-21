import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const menu = {
  id: "01a0c623-2301-7d84-8828-3153286f147a",
  type: "page-type/common-language-term",
  slug: "menu",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "menu" },
    { partOfSpeech: "part-of-speech/noun", spelling: "menus" },
  ],
} as const satisfies CommonLanguageTerm
