import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const homeFolder = {
  id: "01a18d48-70f6-7bae-b1eb-12be98726641",
  type: "page-type/common-language-term",
  slug: "home-folder",
  definition: "the folder that holds a user's own files",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "home folder" },
    { partOfSpeech: "part-of-speech/noun", spelling: "home folders" },
  ],
  createdAt: "2026-10-30T14:48:17.396Z",
  updatedAt: "2026-10-30T14:48:17.396Z",
} as const satisfies CommonLanguageTerm
