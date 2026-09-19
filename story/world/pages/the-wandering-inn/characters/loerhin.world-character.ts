import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const loerhin = {
  id: "01a0b70b-8845-7958-9dca-6a2823c34d76",
  type: "page-type/world-character",
  slug: "loerhin",
  title: "Loerhin",
  world: "world/the-wandering-inn",
  firstChapter: 676,
  lastChapter: 676,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
