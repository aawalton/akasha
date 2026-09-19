import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const perornFleethoof = {
  id: "01a0b70c-2931-7181-8e4d-5c1dc89ff6e8",
  type: "page-type/world-character",
  slug: "perorn-fleethoof",
  title: "Perorn",
  world: "world/the-wandering-inn",
  firstChapter: 333,
  lastChapter: 673,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
