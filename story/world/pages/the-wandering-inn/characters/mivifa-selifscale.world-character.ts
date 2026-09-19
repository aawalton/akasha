import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mivifaSelifscale = {
  id: "01a0b70b-f0fe-7f4a-ba06-0f9ada5bb6a0",
  type: "page-type/world-character",
  slug: "mivifa-selifscale",
  title: "Mivifa Selifscale",
  world: "world/the-wandering-inn",
  firstChapter: 721,
  lastChapter: 721,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
