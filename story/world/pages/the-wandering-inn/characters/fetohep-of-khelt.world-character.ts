import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const fetohepOfKhelt = {
  id: "01a0b70a-83cd-7175-9d68-bb45c0db4f23",
  type: "page-type/world-character",
  slug: "fetohep-of-khelt",
  title: "Fetohep of Khelt",
  world: "world/the-wandering-inn",
  firstChapter: 553,
  lastChapter: 577,
  characterClaims: "jsonl",
  aliasOf: "world-character/fetohep",
} as const satisfies WorldCharacter
