import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const pebblesnatchGoblin = {
  id: "01a0b70c-2517-769e-bc6b-5fbf650c2891",
  type: "page-type/world-character",
  slug: "pebblesnatch-goblin",
  title: "Pebblesnatch",
  world: "world/the-wandering-inn",
  firstChapter: 519,
  lastChapter: 519,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
