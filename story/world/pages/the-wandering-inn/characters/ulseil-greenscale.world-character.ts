import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ulseilGreenscale = {
  id: "01a0b70d-7e97-7307-9477-107247b08aa2",
  type: "page-type/world-character",
  slug: "ulseil-greenscale",
  title: "Ulseil Greenscale",
  world: "world/the-wandering-inn",
  firstChapter: 339,
  lastChapter: 339,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
