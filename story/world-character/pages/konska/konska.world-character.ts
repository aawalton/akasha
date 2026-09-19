import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const konska = {
  id: "01a0b70b-6ed3-7de8-a572-28a47fa53009",
  type: "page-type/world-character",
  slug: "konska",
  title: "Konska",
  world: "world/the-wandering-inn",
  firstChapter: 806,
  lastChapter: 806,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
