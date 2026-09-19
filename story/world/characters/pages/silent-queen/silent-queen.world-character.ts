import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const silentQueen = {
  id: "01a0b70d-004d-7d1d-b5bc-afc1c9747d01",
  type: "page-type/world-character",
  slug: "silent-queen",
  title: "Silent Queen",
  world: "world/the-wandering-inn",
  firstChapter: 394,
  lastChapter: 805,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
