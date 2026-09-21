import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const editor = {
  id: "01a0c625-21ef-7f98-ab69-99162f9392a2",
  type: "page-type/common-language-term",
  slug: "editor",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "editor" },
    { partOfSpeech: "part-of-speech/noun", spelling: "editors" },
  ],
} as const satisfies CommonLanguageTerm
