import type { CommonLanguageTerm } from "akasha/domain/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const dungeon = {
  id: "01a0c628-584a-7178-b3e1-ff992591181f",
  type: "page-type/common-language-term",
  slug: "dungeon",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "dungeon" },
    { partOfSpeech: "part-of-speech/noun", spelling: "dungeons" },
  ],
} as const satisfies CommonLanguageTerm
