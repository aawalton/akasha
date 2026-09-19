import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const twiMaresar = {
  id: "01a0b70d-7560-7cad-9af5-ac71bffc91c1",
  type: "page-type/world-character",
  slug: "twi-maresar",
  title: "Maresar",
  world: "world/the-wandering-inn",
  firstChapter: 180,
  lastChapter: 180,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
