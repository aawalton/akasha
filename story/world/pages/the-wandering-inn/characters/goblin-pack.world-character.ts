import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goblinPack = {
  id: "01a0b705-e7bd-7d7e-a89e-a3307f93feb6",
  type: "page-type/world-character",
  slug: "goblin-pack",
  title: "deformed humanoid creatures",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 2,
  lastChapter: 2,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:16:52.669Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
