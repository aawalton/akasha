import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const s = {
  id: "01a0b70c-a5f3-7311-9689-1c3afd49a0e7",
  type: "page-type/world-character",
  slug: "s",
  title: "s",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 67,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
