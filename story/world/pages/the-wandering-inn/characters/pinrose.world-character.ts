import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pinrose = {
  id: "01a0b70c-6d62-76f7-9055-125ac5e1aeb1",
  type: "page-type/world-character",
  slug: "pinrose",
  title: "Pinrose",
  world: "world/the-wandering-inn",
  firstChapter: 817,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
