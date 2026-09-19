import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gadrea = {
  id: "01a0b70a-8ea4-7078-9616-cfac6aee1b6b",
  type: "page-type/world-character",
  slug: "gadrea",
  title: "Gadrea",
  world: "world/the-wandering-inn",
  firstChapter: 551,
  lastChapter: 812,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
