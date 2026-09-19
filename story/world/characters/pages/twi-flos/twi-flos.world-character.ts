import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const twiFlos = {
  id: "01a0b70d-74ea-7445-908c-ed1455d115f7",
  type: "page-type/world-character",
  slug: "twi-flos",
  title: "Flos",
  world: "world/the-wandering-inn",
  firstChapter: 180,
  lastChapter: 180,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
