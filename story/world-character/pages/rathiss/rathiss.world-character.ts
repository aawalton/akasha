import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rathiss = {
  id: "01a0b70c-8775-74a9-b344-84f930fe420c",
  type: "page-type/world-character",
  slug: "rathiss",
  title: "Colonel Rathiss",
  world: "world/the-wandering-inn",
  firstChapter: 760,
  lastChapter: 760,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
