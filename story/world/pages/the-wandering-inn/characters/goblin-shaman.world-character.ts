import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goblinShaman = {
  id: "01a0b70a-e279-7656-b802-7d7003fc6101",
  type: "page-type/world-character",
  slug: "goblin-shaman",
  title: "Goblin Shaman",
  world: "world/the-wandering-inn",
  firstChapter: 143,
  lastChapter: 143,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
