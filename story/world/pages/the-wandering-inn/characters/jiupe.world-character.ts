import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const jiupe = {
  id: "01a0b70b-2081-7e3b-9424-8c33fd7fad9a",
  type: "page-type/world-character",
  slug: "jiupe",
  title: "Jiupe",
  world: "world/the-wandering-inn",
  firstChapter: 677,
  lastChapter: 677,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
