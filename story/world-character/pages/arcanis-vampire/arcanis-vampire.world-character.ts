import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const arcanisVampire = {
  id: "01a0b707-70bb-72dd-af67-4fa1f95314a6",
  type: "page-type/world-character",
  slug: "arcanis-vampire",
  title: "Arcanis",
  world: "world/the-wandering-inn",
  firstChapter: 715,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
