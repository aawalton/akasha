import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nelliamHailwing = {
  id: "01a0b70c-047f-7bb0-8879-4113ffd59471",
  type: "page-type/world-character",
  slug: "nelliam-hailwing",
  title: "Nelliam Hailwing",
  world: "world/the-wandering-inn",
  firstChapter: 241,
  lastChapter: 241,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
