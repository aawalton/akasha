import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const littlestGoblin = {
  id: "01a0b70b-87a0-7c26-9473-254142630de5",
  type: "page-type/world-character",
  slug: "littlest-goblin",
  title: "The littlest Goblin",
  world: "world/the-wandering-inn",
  firstChapter: 14,
  lastChapter: 14,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
