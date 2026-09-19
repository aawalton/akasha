import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theWitch = {
  id: "01a0b70d-2204-75ab-8e80-eeddd22f404c",
  type: "page-type/world-character",
  slug: "the-witch",
  title: "the Witch of Noelictus",
  world: "world/the-wandering-inn",
  firstChapter: 345,
  lastChapter: 345,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
