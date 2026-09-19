import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const serVorn = {
  id: "01a0b70c-f473-78e2-a3b9-260f45b0f976",
  type: "page-type/world-character",
  slug: "ser-vorn",
  title: "Vorn",
  world: "world/the-wandering-inn",
  firstChapter: 437,
  lastChapter: 437,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
