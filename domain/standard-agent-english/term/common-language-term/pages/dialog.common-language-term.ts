import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const dialog = {
  id: "01a0c62e-24cc-7ab1-8a1f-21d6b4a99569",
  type: "page-type/common-language-term",
  slug: "dialog",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "dialog" },
    { partOfSpeech: "part-of-speech/noun", spelling: "dialogs" },
  ],
} as const satisfies CommonLanguageTerm
