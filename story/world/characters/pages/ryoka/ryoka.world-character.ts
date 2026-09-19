import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ryoka = {
  id: "01a06580-2495-7e14-bf66-b3078bde8b83",
  type: "page-type/world-character",
  slug: "ryoka",
  title: "Ryoka",
  world: "world/the-wandering-inn",
  maxLevel: 3,
  eventCount: 2,
  firstChapter: 22,
  lastChapter: 699,
  characterClaims: "jsonl",
  aliasOf: "world-character/ryoka-griffin",
} as const satisfies WorldCharacter
