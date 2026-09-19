import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const archmageNaili = {
  id: "01a0b707-7126-74e4-954f-4e87248aa8de",
  type: "page-type/world-character",
  slug: "archmage-naili",
  title: "Archmage Nailihuaile",
  world: "world/the-wandering-inn",
  firstChapter: 275,
  lastChapter: 275,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
