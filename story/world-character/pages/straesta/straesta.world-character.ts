import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const straesta = {
  id: "01a0b70d-0f53-7fca-b2f4-fde3731d4414",
  type: "page-type/world-character",
  slug: "straesta",
  title: "Straesta",
  world: "world/the-wandering-inn",
  firstChapter: 695,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
