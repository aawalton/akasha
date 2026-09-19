import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const noears = {
  id: "01a0b70c-0a81-7973-a51c-dfec60a580d8",
  type: "page-type/world-character",
  slug: "noears",
  title: "the Goblin with no ears",
  world: "world/the-wandering-inn",
  firstChapter: 154,
  lastChapter: 309,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
