import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const regisavSixtails = {
  id: "01a0b70c-8b80-7a3c-a433-7dc5390d5877",
  type: "page-type/world-character",
  slug: "regisav-sixtails",
  title: "Regisav Sixtails",
  world: "world/the-wandering-inn",
  firstChapter: 339,
  lastChapter: 339,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
