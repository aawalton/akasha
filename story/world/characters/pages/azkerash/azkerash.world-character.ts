import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const azkerash = {
  id: "01a0b707-7765-7d89-9c32-93ce7a3689cd",
  type: "page-type/world-character",
  slug: "azkerash",
  title: "Az'kerash",
  world: "world/the-wandering-inn",
  firstChapter: 232,
  lastChapter: 322,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
