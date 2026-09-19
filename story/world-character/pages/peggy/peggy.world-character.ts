import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const peggy = {
  id: "01a0b70c-25fa-7e27-b7a8-4adb9f9ed4d2",
  type: "page-type/world-character",
  slug: "peggy",
  title: "Peggy",
  world: "world/the-wandering-inn",
  firstChapter: 641,
  lastChapter: 690,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
