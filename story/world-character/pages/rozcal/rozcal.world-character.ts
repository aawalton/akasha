import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rozcal = {
  id: "01a0b70c-9ff8-7255-8271-9c7dcdab9117",
  type: "page-type/world-character",
  slug: "rozcal",
  title: "Rozcal",
  world: "world/the-wandering-inn",
  firstChapter: 634,
  lastChapter: 634,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
