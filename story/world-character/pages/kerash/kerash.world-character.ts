import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kerash = {
  id: "01a0b70b-6768-7dd5-b240-5adadaf74d3d",
  type: "page-type/world-character",
  slug: "kerash",
  title: "Kerash",
  world: "world/the-wandering-inn",
  firstChapter: 102,
  lastChapter: 412,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
