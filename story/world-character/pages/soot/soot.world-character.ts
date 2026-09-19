import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const soot = {
  id: "01a0b70d-0997-7ffd-8bed-0af48cf9747e",
  type: "page-type/world-character",
  slug: "soot",
  title: "Mister Soot",
  world: "world/the-wandering-inn",
  firstChapter: 397,
  lastChapter: 778,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
