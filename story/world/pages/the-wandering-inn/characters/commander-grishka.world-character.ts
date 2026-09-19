import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const commanderGrishka = {
  id: "01a0b70a-0685-76ae-a78c-7fd4617f6e69",
  type: "page-type/world-character",
  slug: "commander-grishka",
  title: "Grishka",
  world: "world/the-wandering-inn",
  firstChapter: 198,
  lastChapter: 198,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
