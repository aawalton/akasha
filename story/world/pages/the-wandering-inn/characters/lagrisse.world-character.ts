import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lagrisse = {
  id: "01a0b70b-7743-75ca-943e-ce569898dc6f",
  type: "page-type/world-character",
  slug: "lagrisse",
  title: "Lagrisse",
  world: "world/the-wandering-inn",
  firstChapter: 823,
  lastChapter: 823,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
