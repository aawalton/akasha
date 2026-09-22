import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ascoden = {
  id: "01a0b707-745b-761c-8526-cabfc753ba9e",
  type: "page-type/world-character",
  slug: "ascoden",
  title: "Ascoden",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 606,
  lastChapter: 607,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
