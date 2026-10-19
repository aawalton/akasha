import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const menu = {
  id: "01a155c0-dc7c-7bc5-acad-6cd2a890be7e",
  type: "page-type/common-language-term",
  slug: "menu",
  definition: "a list of choices a program shows",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "menu" },
    { partOfSpeech: "part-of-speech/noun", spelling: "menus" },
  ],
  createdAt: "2026-10-19T20:01:05.147Z",
  updatedAt: "2026-10-19T20:01:05.147Z",
} as const satisfies CommonLanguageTerm
