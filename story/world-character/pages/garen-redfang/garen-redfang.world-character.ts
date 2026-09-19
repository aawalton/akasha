import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const garenRedfang = {
  id: "01a0b70a-9140-707a-b816-179489754b31",
  type: "page-type/world-character",
  slug: "garen-redfang",
  title: "Garen Redfang",
  world: "world/the-wandering-inn",
  firstChapter: 123,
  lastChapter: 784,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
