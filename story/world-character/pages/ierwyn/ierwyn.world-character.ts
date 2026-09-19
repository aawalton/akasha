import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ierwyn = {
  id: "01a0b70b-066d-7d3c-aeef-730dca6b67a0",
  type: "page-type/world-character",
  slug: "ierwyn",
  title: "Ierwyn",
  world: "world/the-wandering-inn",
  firstChapter: 514,
  lastChapter: 807,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
