import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nailrenGhost = {
  id: "01a0b70b-ffa3-7977-8710-42f9ac258897",
  type: "page-type/world-character",
  slug: "nailren-ghost",
  title: "Spoony",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 813,
  lastChapter: 813,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
