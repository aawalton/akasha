import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goblinPack = {
  id: "01a0b705-e7bd-7d7e-a89e-a3307f93feb6",
  type: "page-type/world-character",
  slug: "goblin-pack",
  title: "deformed humanoid creatures",
  world: "world/the-wandering-inn",
  firstChapter: 2,
  lastChapter: 2,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
