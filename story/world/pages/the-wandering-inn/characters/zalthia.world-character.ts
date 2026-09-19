import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zalthia = {
  id: "01a0b70d-e799-77a1-b7e4-55e1620cd662",
  type: "page-type/world-character",
  slug: "zalthia",
  title: "Zalthia",
  world: "world/the-wandering-inn",
  firstChapter: 199,
  lastChapter: 199,
  characterClaims: "jsonl",
  aliasOf: "world-character/zalthia-werskiv",
} as const satisfies WorldCharacter
