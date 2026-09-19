import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const joreldyn = {
  id: "01a0b70b-20f1-7476-839c-9d74637f3ec8",
  type: "page-type/world-character",
  slug: "joreldyn",
  title: "Joreldyn",
  world: "world/the-wandering-inn",
  firstChapter: 703,
  lastChapter: 807,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
