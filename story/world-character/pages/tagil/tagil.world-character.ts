import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tagil = {
  id: "01a0b70d-117c-7f37-beac-6f00c3e36b12",
  type: "page-type/world-character",
  slug: "tagil",
  title: "Tagil",
  world: "world/the-wandering-inn",
  firstChapter: 360,
  lastChapter: 360,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
