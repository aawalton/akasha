import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const level12Warrior = {
  id: "01a0d3ca-5f22-7fe9-b48a-db674b49dabf",
  type: "page-type/world-character",
  slug: "level-12-warrior",
  title: "Level 12 Warrior",
  world: "world/the-wandering-inn",
} as const satisfies WorldCharacter
