import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tomClown = {
  id: "01a0b70d-6bbf-7d46-bebb-689fdd01153a",
  type: "page-type/world-character",
  slug: "tom-clown",
  title: "Tom",
  world: "world/the-wandering-inn",
  firstChapter: 437,
  lastChapter: 437,
  characterClaims: "jsonl",
  aliasOf: "world-character/tom",
} as const satisfies WorldCharacter
