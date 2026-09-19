import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const iraz = {
  id: "01a0b70b-1109-796d-a0d5-35bb9a853312",
  type: "page-type/world-character",
  slug: "iraz",
  title: "Iraz",
  world: "world/the-wandering-inn",
  firstChapter: 485,
  lastChapter: 585,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
