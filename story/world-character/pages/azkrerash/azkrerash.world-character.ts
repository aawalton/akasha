import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const azkrerash = {
  id: "01a0b707-77ce-7cd6-ab17-bc6fa07636c1",
  type: "page-type/world-character",
  slug: "azkrerash",
  title: "the Necromancer",
  world: "world/the-wandering-inn",
  firstChapter: 293,
  lastChapter: 293,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
