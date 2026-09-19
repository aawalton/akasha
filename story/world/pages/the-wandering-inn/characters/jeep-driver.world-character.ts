import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const jeepDriver = {
  id: "01a0b70b-1bd7-7ecc-9802-56c806d3fe98",
  type: "page-type/world-character",
  slug: "jeep-driver",
  title: "the Jeep Driver",
  world: "world/the-wandering-inn",
  firstChapter: 756,
  lastChapter: 756,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
