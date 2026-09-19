import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const geram = {
  id: "01a0b70a-9b59-742e-b23b-7e46dc803a18",
  type: "page-type/world-character",
  slug: "geram",
  title: "Geram",
  world: "world/the-wandering-inn",
  firstChapter: 250,
  lastChapter: 250,
  characterClaims: "jsonl",
  aliasOf: "world-character/geram-redfist",
} as const satisfies WorldCharacter
