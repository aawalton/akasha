import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lordGilamQuellae = {
  id: "01a0b70b-8997-7741-9452-3eb47bd2eeeb",
  type: "page-type/world-character",
  slug: "lord-gilam-quellae",
  title: "Lord Gilam Quellae",
  world: "world/the-wandering-inn",
  firstChapter: 787,
  lastChapter: 787,
  characterClaims: "jsonl",
  aliasOf: "world-character/gilam-quellae",
} as const satisfies WorldCharacter
