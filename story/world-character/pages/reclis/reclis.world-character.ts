import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const reclis = {
  id: "01a0b70c-88c0-7bb2-98ad-bd204c6f516a",
  type: "page-type/world-character",
  slug: "reclis",
  title: "Reclis du Marquin",
  world: "world/the-wandering-inn",
  firstChapter: 609,
  lastChapter: 609,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
