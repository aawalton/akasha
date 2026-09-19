import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const calruz = {
  id: "01a0b707-9087-7a18-a38f-3e99d3bdddeb",
  type: "page-type/world-character",
  slug: "calruz",
  title: "Calruz",
  world: "world/the-wandering-inn",
  firstChapter: 29,
  lastChapter: 791,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
