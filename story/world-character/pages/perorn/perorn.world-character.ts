import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const perorn = {
  id: "01a0b70c-28f8-7151-b165-61fc712ff537",
  type: "page-type/world-character",
  slug: "perorn",
  title: "Perorn",
  world: "world/the-wandering-inn",
  firstChapter: 332,
  lastChapter: 680,
  characterClaims: "jsonl",
  aliasOf: "world-character/perorn-fleethoof",
} as const satisfies WorldCharacter
