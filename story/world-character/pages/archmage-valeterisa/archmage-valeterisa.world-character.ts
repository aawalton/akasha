import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const archmageValeterisa = {
  id: "01a0b707-715b-7de5-b04f-e6759b8d4867",
  type: "page-type/world-character",
  slug: "archmage-valeterisa",
  title: "Archmage Valeterisa",
  world: "world/the-wandering-inn",
  firstChapter: 448,
  lastChapter: 545,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
