import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const suxhel = {
  id: "01a0b70d-109c-7654-ac2d-cf7ddc290de2",
  type: "page-type/world-character",
  slug: "suxhel",
  title: "Suxhel",
  world: "world/the-wandering-inn",
  firstChapter: 543,
  lastChapter: 543,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
