import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const leapwolf = {
  id: "01a0b70b-7f3c-7e9a-9641-f5215864a106",
  type: "page-type/world-character",
  slug: "leapwolf",
  title: "Leapwolf",
  world: "world/the-wandering-inn",
  firstChapter: 409,
  lastChapter: 752,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
