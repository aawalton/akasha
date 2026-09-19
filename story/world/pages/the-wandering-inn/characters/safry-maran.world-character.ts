import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const safryMaran = {
  id: "01a0b70c-a752-7549-b115-ce8f2ace4e94",
  type: "page-type/world-character",
  slug: "safry-maran",
  title: "Safry and Maran",
  world: "world/the-wandering-inn",
  firstChapter: 122,
  lastChapter: 122,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
