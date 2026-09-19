import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const leneva = {
  id: "01a0b70b-80fa-7402-8716-91670f473650",
  type: "page-type/world-character",
  slug: "leneva",
  title: "Leneva",
  world: "world/the-wandering-inn",
  firstChapter: 643,
  lastChapter: 643,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
