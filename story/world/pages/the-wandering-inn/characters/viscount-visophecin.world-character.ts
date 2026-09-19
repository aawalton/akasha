import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const viscountVisophecin = {
  id: "01a0b70d-94f0-7a95-8048-141d9e00309e",
  type: "page-type/world-character",
  slug: "viscount-visophecin",
  title: "Visophecin",
  world: "world/the-wandering-inn",
  firstChapter: 551,
  lastChapter: 682,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
