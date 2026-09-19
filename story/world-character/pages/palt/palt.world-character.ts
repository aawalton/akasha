import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const palt = {
  id: "01a0b70c-2085-717a-9ada-8011bd07d7d8",
  type: "page-type/world-character",
  slug: "palt",
  title: "Palt",
  world: "world/the-wandering-inn",
  firstChapter: 374,
  lastChapter: 775,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
