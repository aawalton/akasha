import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const healerHekusha = {
  id: "01a0b70a-f60e-73b2-aa26-3060cf00cef8",
  type: "page-type/world-character",
  slug: "healer-hekusha",
  title: "Hekusha",
  world: "world/the-wandering-inn",
  firstChapter: 812,
  lastChapter: 812,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
