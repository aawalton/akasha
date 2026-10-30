import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commandPalette = {
  id: "01a05be9-d4c2-7a60-bb20-12f071968480",
  type: "page-type/module",
  slug: "command-palette",
  definition: "the overlay a reader opens to search every keyboard binding by name",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "command palette" },
    { partOfSpeech: "part-of-speech/noun", spelling: "command palettes" },
  ],
  code: "tsx",
  createdAt: "2026-09-01T07:40:46.146Z",
  updatedAt: "2026-10-30T15:43:47.865Z",
} as const satisfies Module
