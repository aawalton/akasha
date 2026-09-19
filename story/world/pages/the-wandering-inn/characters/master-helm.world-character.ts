import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const masterHelm = {
  id: "01a0b70b-9da1-741e-abd8-7284f42e3c83",
  type: "page-type/world-character",
  slug: "master-helm",
  title: "Master Helm",
  world: "world/the-wandering-inn",
  firstChapter: 446,
  lastChapter: 446,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
