import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const slaveLordPazeral = {
  id: "01a0b70d-058c-7235-9519-b186ea7813ad",
  type: "page-type/world-character",
  slug: "slave-lord-pazeral",
  title: "Slave Lord Pazeral",
  world: "world/the-wandering-inn",
  firstChapter: 799,
  lastChapter: 799,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
