import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const embrimThrus = {
  id: "01a0b70a-6ad4-7d52-bfaa-ec56b328d8ef",
  type: "page-type/world-character",
  slug: "embrim-thrus",
  title: "Embrim",
  world: "world/the-wandering-inn",
  firstChapter: 198,
  lastChapter: 198,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
