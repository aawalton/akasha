import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nokha = {
  id: "01a0b70c-0af1-72fe-aac2-e5d1f1535fde",
  type: "page-type/world-character",
  slug: "nokha",
  title: "the female awakened Raskghar",
  world: "world/the-wandering-inn",
  firstChapter: 285,
  lastChapter: 578,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
