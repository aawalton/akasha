import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const comois = {
  id: "01a0b70a-06ee-78f5-9e42-195a9712a2e5",
  type: "page-type/world-character",
  slug: "comois",
  title: "Comois",
  world: "world/the-wandering-inn",
  firstChapter: 752,
  lastChapter: 752,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
