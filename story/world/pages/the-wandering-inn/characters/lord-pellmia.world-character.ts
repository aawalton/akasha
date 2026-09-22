import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lordPellmia = {
  id: "01a0b70b-8af8-7f01-ae1c-d24b37e0f4eb",
  type: "page-type/world-character",
  slug: "lord-pellmia",
  title: "Pellmia",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 291,
  lastChapter: 291,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
