import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const serDalimont = {
  id: "01a0b70c-f2f4-77e7-8a85-84fd02c69092",
  type: "page-type/world-character",
  slug: "ser-dalimont",
  title: "Ser Dalimont",
  world: "world/the-wandering-inn",
  firstChapter: 512,
  lastChapter: 707,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
