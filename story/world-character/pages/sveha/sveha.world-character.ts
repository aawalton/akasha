import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sveha = {
  id: "01a0b70d-10d6-78be-a707-8606ca505a8c",
  type: "page-type/world-character",
  slug: "sveha",
  title: "Sveha",
  world: "world/the-wandering-inn",
  firstChapter: 520,
  lastChapter: 520,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
