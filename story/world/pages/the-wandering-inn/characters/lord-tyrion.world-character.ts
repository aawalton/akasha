import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lordTyrion = {
  id: "01a0b70b-8ba1-735e-bdbd-47ce3d516b9d",
  type: "page-type/world-character",
  slug: "lord-tyrion",
  title: "Lord Tyrion",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 111,
  lastChapter: 250,
  characterClaims: "jsonl",
  aliasOf: "world-character/tyrion-veltras",
  createdAt: "2026-09-19T00:23:02.305Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
