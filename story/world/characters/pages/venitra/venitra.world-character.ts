import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const venitra = {
  id: "01a0b70d-8e84-73fd-b3e2-c1b31cf09ecd",
  type: "page-type/world-character",
  slug: "venitra",
  title: "Venitra",
  world: "world/the-wandering-inn",
  firstChapter: 102,
  lastChapter: 615,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
