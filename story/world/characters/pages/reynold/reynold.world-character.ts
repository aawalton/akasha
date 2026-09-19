import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const reynold = {
  id: "01a0b70c-93bf-7501-82d8-1e361efa3c8f",
  type: "page-type/world-character",
  slug: "reynold",
  title: "Reynold",
  world: "world/the-wandering-inn",
  firstChapter: 109,
  lastChapter: 762,
  characterClaims: "jsonl",
  aliasOf: "world-character/reynold-ferusdam",
} as const satisfies WorldCharacter
