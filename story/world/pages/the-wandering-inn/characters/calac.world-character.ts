import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const calac = {
  id: "01a0b707-8c77-7429-b914-724b0f3c3e30",
  type: "page-type/world-character",
  slug: "calac",
  title: "Calac",
  world: "world/the-wandering-inn",
  firstChapter: 179,
  lastChapter: 370,
  characterClaims: "jsonl",
  aliasOf: "world-character/calac-crusland",
} as const satisfies WorldCharacter
