import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gloriam = {
  id: "01a0b70a-9f8a-7e2e-8de3-0ca35e9d0341",
  type: "page-type/world-character",
  slug: "gloriam",
  title: "Gloriam",
  world: "world/the-wandering-inn",
  firstChapter: 698,
  lastChapter: 698,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
