import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mirin = {
  id: "01a0b70b-ef37-7437-a0fc-ca51353b75f1",
  type: "page-type/world-character",
  slug: "mirin",
  title: "Mirin",
  world: "world/the-wandering-inn",
  firstChapter: 324,
  lastChapter: 410,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
