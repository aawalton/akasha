import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const adetrSteelfur = {
  id: "01a06580-2493-7357-886c-a15d44dc3bb4",
  type: "page-type/world-character",
  slug: "adetr-steelfur",
  title: "Adetr",
  world: "world/the-wandering-inn",
  maxLevel: 27,
  eventCount: 2,
  firstChapter: 520,
  lastChapter: 711,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
