import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pavilionEntity = {
  id: "01a0b70c-2131-7ca1-802d-769cacefea1a",
  type: "page-type/world-character",
  slug: "pavilion-entity",
  title: "the being wearing Erin's form",
  world: "world/the-wandering-inn",
  firstChapter: 725,
  lastChapter: 725,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
