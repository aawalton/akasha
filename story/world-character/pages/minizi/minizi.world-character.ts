import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const minizi = {
  id: "01a0b70b-ec4b-765b-a729-5db468a1483c",
  type: "page-type/world-character",
  slug: "minizi",
  title: "Minizi",
  world: "world/the-wandering-inn",
  firstChapter: 496,
  lastChapter: 558,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
