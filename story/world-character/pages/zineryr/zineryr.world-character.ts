import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zineryr = {
  id: "01a0b70d-ee88-79f6-b996-7e1a71dfff4c",
  type: "page-type/world-character",
  slug: "zineryr",
  title: "Zineryr",
  world: "world/the-wandering-inn",
  firstChapter: 578,
  lastChapter: 679,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
