import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const fantim = {
  id: "01a0b70a-7b46-7a15-afae-71275cc66a02",
  type: "page-type/world-character",
  slug: "fantim",
  title: "Fantim",
  world: "world/the-wandering-inn",
  firstChapter: 767,
  lastChapter: 767,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
