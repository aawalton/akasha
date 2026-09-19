import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rittane = {
  id: "01a0b70c-9aae-7d20-88d5-55a1134628c4",
  type: "page-type/world-character",
  slug: "rittane",
  title: "Rittane",
  world: "world/the-wandering-inn",
  firstChapter: 649,
  lastChapter: 650,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
