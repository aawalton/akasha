import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const caoraz = {
  id: "01a0b707-918c-73f9-882a-316606bf1d29",
  type: "page-type/world-character",
  slug: "caoraz",
  title: "Caoraz",
  world: "world/the-wandering-inn",
  firstChapter: 675,
  lastChapter: 675,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
