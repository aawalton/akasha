import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const antiniumSoldiers = {
  id: "01a0b707-6f85-7c31-9384-48488f706744",
  type: "page-type/world-character",
  slug: "antinium-soldiers",
  title: "Antinium Soldiers",
  world: "world/the-wandering-inn",
  firstChapter: 364,
  lastChapter: 364,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
