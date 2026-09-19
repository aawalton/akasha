import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const comrei = {
  id: "01a0b70a-0722-738c-a9e1-9d0380e6f27e",
  type: "page-type/world-character",
  slug: "comrei",
  title: "Comrei",
  world: "world/the-wandering-inn",
  firstChapter: 656,
  lastChapter: 656,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
