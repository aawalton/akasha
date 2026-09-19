import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const watchCaptainZevara = {
  id: "01a0b70d-9b25-7deb-a5d8-9b1b96623693",
  type: "page-type/world-character",
  slug: "watch-captain-zevara",
  title: "Watch Captain Zevara",
  world: "world/the-wandering-inn",
  firstChapter: 328,
  lastChapter: 669,
  characterClaims: "jsonl",
  aliasOf: "world-character/zevara",
} as const satisfies WorldCharacter
