import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const grasstongue = {
  id: "01a0b70a-e9a9-756a-a090-0c031a6dc10c",
  type: "page-type/world-character",
  slug: "grasstongue",
  title: "Grasstongue",
  world: "world/the-wandering-inn",
  firstChapter: 253,
  lastChapter: 253,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
