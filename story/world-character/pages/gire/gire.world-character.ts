import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gire = {
  id: "01a0b70a-9e6a-73e0-85fe-9281de2c3f7e",
  type: "page-type/world-character",
  slug: "gire",
  title: "Gireulashia",
  world: "world/the-wandering-inn",
  firstChapter: 521,
  lastChapter: 584,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
