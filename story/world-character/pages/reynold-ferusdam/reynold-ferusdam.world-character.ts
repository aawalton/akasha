import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const reynoldFerusdam = {
  id: "01a0b70c-9436-7d33-b57b-935e5f5722f3",
  type: "page-type/world-character",
  slug: "reynold-ferusdam",
  title: "Reynold Ferusdam",
  world: "world/the-wandering-inn",
  firstChapter: 449,
  lastChapter: 449,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
