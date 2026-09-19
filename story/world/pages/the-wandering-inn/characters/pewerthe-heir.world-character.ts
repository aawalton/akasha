import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pewertheHeir = {
  id: "01a0b70c-69b9-7a66-8fe1-a389a5045aef",
  type: "page-type/world-character",
  slug: "pewerthe-heir",
  title: "Pewerthe",
  world: "world/the-wandering-inn",
  firstChapter: 808,
  lastChapter: 808,
  characterClaims: "jsonl",
  aliasOf: "world-character/pewerthe",
} as const satisfies WorldCharacter
