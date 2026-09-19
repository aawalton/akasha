import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sirKerrigLouis = {
  id: "01a0b70d-020f-71b5-9e27-17b10ab6fcec",
  type: "page-type/world-character",
  slug: "sir-kerrig-louis",
  title: "Sir Kerrig Louis",
  world: "world/the-wandering-inn",
  firstChapter: 260,
  lastChapter: 261,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
