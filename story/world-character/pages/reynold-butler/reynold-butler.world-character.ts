import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const reynoldButler = {
  id: "01a0b70c-93fa-7cf4-909d-239535014e3d",
  type: "page-type/world-character",
  slug: "reynold-butler",
  title: "Reynold",
  world: "world/the-wandering-inn",
  firstChapter: 110,
  lastChapter: 110,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
