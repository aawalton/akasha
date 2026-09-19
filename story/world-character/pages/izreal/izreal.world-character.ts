import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const izreal = {
  id: "01a0b70b-176a-758b-9438-64c617905cbf",
  type: "page-type/world-character",
  slug: "izreal",
  title: "Izreal",
  world: "world/the-wandering-inn",
  firstChapter: 807,
  lastChapter: 807,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
