import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const princessSeraphel = {
  id: "01a0b70c-753b-7f50-a3d3-9ff5767de90c",
  type: "page-type/world-character",
  slug: "princess-seraphel",
  title: "Princess Seraphel",
  world: "world/the-wandering-inn",
  firstChapter: 572,
  lastChapter: 583,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
