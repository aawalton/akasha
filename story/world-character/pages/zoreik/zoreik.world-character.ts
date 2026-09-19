import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zoreik = {
  id: "01a0b70d-ef00-7de1-883c-342f7369b3d1",
  type: "page-type/world-character",
  slug: "zoreik",
  title: "Zoreik",
  world: "world/the-wandering-inn",
  firstChapter: 668,
  lastChapter: 668,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
