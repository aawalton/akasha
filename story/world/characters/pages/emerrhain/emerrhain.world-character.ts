import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const emerrhain = {
  id: "01a0b70a-6b08-7fdd-ac16-02769c32277d",
  type: "page-type/world-character",
  slug: "emerrhain",
  title: "Emerrhain",
  world: "world/the-wandering-inn",
  firstChapter: 578,
  lastChapter: 758,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
