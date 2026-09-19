import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const captainLasc = {
  id: "01a0b707-9393-7492-ace1-327d99ebd053",
  type: "page-type/world-character",
  slug: "captain-lasc",
  title: "Lasc",
  world: "world/the-wandering-inn",
  firstChapter: 417,
  lastChapter: 418,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
