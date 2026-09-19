import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mountainHob = {
  id: "01a0b70b-f7dc-7135-aef9-4db1b2eb46ef",
  type: "page-type/world-character",
  slug: "mountain-hob",
  title: "the Hob from Tremborag's mountain",
  world: "world/the-wandering-inn",
  firstChapter: 155,
  lastChapter: 155,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
