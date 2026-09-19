import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const russell = {
  id: "01a0b70c-a0de-75e8-a943-0c66996a4e29",
  type: "page-type/world-character",
  slug: "russell",
  title: "Russell",
  world: "world/the-wandering-inn",
  firstChapter: 818,
  lastChapter: 818,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
