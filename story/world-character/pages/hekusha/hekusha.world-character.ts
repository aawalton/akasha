import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hekusha = {
  id: "01a0b70a-f80f-7c2a-8d54-4a285378327e",
  type: "page-type/world-character",
  slug: "hekusha",
  title: "Hekusha",
  world: "world/the-wandering-inn",
  firstChapter: 539,
  lastChapter: 539,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
