import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const guild = {
  id: "01a0c62d-7a43-7dc1-bbc0-edbf5406c3ed",
  type: "page-type/common-language-term",
  slug: "guild",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "guild" },
    { partOfSpeech: "part-of-speech/noun", spelling: "guilds" },
  ],
} as const satisfies CommonLanguageTerm
