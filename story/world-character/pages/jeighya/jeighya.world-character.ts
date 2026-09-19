import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const jeighya = {
  id: "01a0b70b-1c0d-7ba6-883a-75308e3d28a8",
  type: "page-type/world-character",
  slug: "jeighya",
  title: "Jeighya",
  world: "world/the-wandering-inn",
  firstChapter: 204,
  lastChapter: 204,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
