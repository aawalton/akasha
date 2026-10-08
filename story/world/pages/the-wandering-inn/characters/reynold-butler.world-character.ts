import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const reynoldButler = {
  id: "01a0b70c-93fa-7cf4-909d-239535014e3d",
  type: "page-type/world-character",
  slug: "reynold-butler",
  title: "Reynold",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 110,
  lastChapter: 110,
  characterClaims: "jsonl",
  aliasOf: "world-character/reynold-ferusdam",
  createdAt: "2026-09-19T00:24:09.978Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
