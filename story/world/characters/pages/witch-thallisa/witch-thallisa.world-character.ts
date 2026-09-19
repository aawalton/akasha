import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const witchThallisa = {
  id: "01a0b70d-9ff9-79fe-9674-8dbaad5998ae",
  type: "page-type/world-character",
  slug: "witch-thallisa",
  title: "Thallisa",
  world: "world/the-wandering-inn",
  firstChapter: 714,
  lastChapter: 714,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
