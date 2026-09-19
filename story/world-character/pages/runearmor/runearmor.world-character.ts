import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const runearmor = {
  id: "01a0b70c-a0a4-7eaf-a006-9c4839c73729",
  type: "page-type/world-character",
  slug: "runearmor",
  title: "Runearmor",
  world: "world/the-wandering-inn",
  firstChapter: 805,
  lastChapter: 805,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
