import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kalnisFelscale = {
  id: "01a0b70b-2343-7a32-a6ae-fa1ea7a91ddd",
  type: "page-type/world-character",
  slug: "kalnis-felscale",
  title: "Kalnis Felscale",
  world: "world/the-wandering-inn",
  firstChapter: 770,
  lastChapter: 770,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
