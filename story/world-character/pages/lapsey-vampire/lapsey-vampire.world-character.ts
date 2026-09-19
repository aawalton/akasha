import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lapseyVampire = {
  id: "01a0b70b-7b21-75aa-8416-90b8f311ee26",
  type: "page-type/world-character",
  slug: "lapsey-vampire",
  title: "Lapsey",
  world: "world/the-wandering-inn",
  firstChapter: 715,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
