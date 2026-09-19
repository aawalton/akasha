import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nicoletta = {
  id: "01a0b70c-08b9-7776-9047-e118278093ff",
  type: "page-type/world-character",
  slug: "nicoletta",
  title: "Nicoletta",
  world: "world/the-wandering-inn",
  firstChapter: 316,
  lastChapter: 316,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
