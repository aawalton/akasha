import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const twiTeres = {
  id: "01a0b70d-760f-7f88-a46b-b7a3d8fc5d4a",
  type: "page-type/world-character",
  slug: "twi-teres",
  title: "Teres",
  world: "world/the-wandering-inn",
  firstChapter: 180,
  lastChapter: 180,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
