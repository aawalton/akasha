import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const healingSlime = {
  id: "01a0b70a-f648-7723-9ad7-6086dad0d8bf",
  type: "page-type/world-character",
  slug: "healing-slime",
  title: "Healing Slime",
  world: "world/the-wandering-inn",
  firstChapter: 770,
  lastChapter: 770,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
