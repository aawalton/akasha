import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const raava = {
  id: "01a0b70c-7d14-729f-8466-158083fe7448",
  type: "page-type/world-character",
  slug: "raava",
  title: "Raava",
  world: "world/the-wandering-inn",
  firstChapter: 694,
  lastChapter: 694,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
