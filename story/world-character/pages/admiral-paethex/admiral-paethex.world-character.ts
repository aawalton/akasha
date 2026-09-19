import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const admiralPaethex = {
  id: "01a0b707-6430-7f7e-bcea-d74cd89bbf47",
  type: "page-type/world-character",
  slug: "admiral-paethex",
  title: "Admiral Paethex",
  world: "world/the-wandering-inn",
  firstChapter: 797,
  lastChapter: 797,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
