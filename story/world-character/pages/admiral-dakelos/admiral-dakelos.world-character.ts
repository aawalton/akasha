import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const admiralDakelos = {
  id: "01a06580-2493-754d-aa3d-c53cb24be1e6",
  type: "page-type/world-character",
  slug: "admiral-dakelos",
  title: "Dakelos",
  world: "world/the-wandering-inn",
  maxLevel: 40,
  eventCount: 7,
  firstChapter: 646,
  lastChapter: 687,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
