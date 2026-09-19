import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kerrig = {
  id: "01a0b70b-679d-78e3-b139-0e41fc017414",
  type: "page-type/world-character",
  slug: "kerrig",
  title: "Sir Kerrig",
  world: "world/the-wandering-inn",
  firstChapter: 337,
  lastChapter: 337,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
