import type { CommonLanguageTerm } from "akasha/domain/plain-language/standard-agent-english/term/common-language-term/common-language-term.page-type.types.ts"

export const wallpaper = {
  id: "01a0d56c-5d0b-788d-9618-5f3fe337517e",
  type: "page-type/common-language-term",
  slug: "wallpaper",
  definition: "a picture behind what a screen shows",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "wallpaper" },
    { partOfSpeech: "part-of-speech/noun", spelling: "wallpapers" },
  ],
  createdAt: "2026-09-24T21:57:23.851Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies CommonLanguageTerm
