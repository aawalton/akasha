import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sableCatBeastkin = {
  id: "01a0b70c-a665-7bbe-b195-e92fac8f6895",
  type: "page-type/world-character",
  slug: "sable-cat-beastkin",
  title: "Sable",
  world: "world/the-wandering-inn",
  firstChapter: 715,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
