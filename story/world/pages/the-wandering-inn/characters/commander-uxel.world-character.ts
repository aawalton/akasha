import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const commanderUxel = {
  id: "01a0b70a-06bc-7096-ba53-0a9a5250bd48",
  type: "page-type/world-character",
  slug: "commander-uxel",
  title: "Uxel",
  world: "world/the-wandering-inn",
  firstChapter: 437,
  lastChapter: 437,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
