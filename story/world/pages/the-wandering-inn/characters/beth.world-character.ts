import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const beth = {
  id: "01a0b707-817a-7724-8350-69ba8a66023d",
  type: "page-type/world-character",
  slug: "beth",
  title: "Beth",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 699,
  lastChapter: 699,
  characterClaims: "jsonl",
  aliasOf: "world-character/beth-scastein",
  createdAt: "2026-09-19T00:18:37.562Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
