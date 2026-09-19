import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const vexx = {
  id: "01a0b70d-92d6-7d27-aebf-63dd3aef69a6",
  type: "page-type/world-character",
  slug: "vexx",
  title: "Vexx",
  world: "world/the-wandering-inn",
  firstChapter: 643,
  lastChapter: 643,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
