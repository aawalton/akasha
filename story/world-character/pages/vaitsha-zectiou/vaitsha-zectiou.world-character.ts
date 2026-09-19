import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const vaitshaZectiou = {
  id: "01a0b70d-83e2-70af-abf3-e9577ee5ce44",
  type: "page-type/world-character",
  slug: "vaitsha-zectiou",
  title: "Vaitsha Zectiou",
  world: "world/the-wandering-inn",
  firstChapter: 323,
  lastChapter: 399,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
