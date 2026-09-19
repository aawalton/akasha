import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const shassaWeaverweb = {
  id: "01a0b70c-fb83-78a0-a95b-a53e25d201ac",
  type: "page-type/world-character",
  slug: "shassa-weaverweb",
  title: "Shassa",
  world: "world/the-wandering-inn",
  firstChapter: 434,
  lastChapter: 623,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
