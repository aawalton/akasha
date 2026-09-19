import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const heraldIerwyn = {
  id: "01a0b70a-f915-78b3-a98f-fa92f0422104",
  type: "page-type/world-character",
  slug: "herald-ierwyn",
  title: "Herald Ierwyn",
  world: "world/the-wandering-inn",
  firstChapter: 694,
  lastChapter: 694,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
