import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eirnos = {
  id: "01a0b70a-23ea-71fd-b3ed-710a5bc25d22",
  type: "page-type/world-character",
  slug: "eirnos",
  title: "Eirnos",
  world: "world/the-wandering-inn",
  firstChapter: 618,
  lastChapter: 634,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
