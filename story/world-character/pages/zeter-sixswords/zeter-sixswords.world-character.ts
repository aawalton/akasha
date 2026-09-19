import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zeterSixswords = {
  id: "01a0b70d-ec7c-79b6-9130-970bbf19bc8f",
  type: "page-type/world-character",
  slug: "zeter-sixswords",
  title: "Zeter",
  world: "world/the-wandering-inn",
  firstChapter: 464,
  lastChapter: 464,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
