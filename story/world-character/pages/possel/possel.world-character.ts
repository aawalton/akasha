import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const possel = {
  id: "01a0b70c-722d-7131-b00c-d6a323438853",
  type: "page-type/world-character",
  slug: "possel",
  title: "Possel",
  world: "world/the-wandering-inn",
  firstChapter: 510,
  lastChapter: 510,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
