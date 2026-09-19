import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rosech = {
  id: "01a0b70c-9f49-7a44-ab4f-36211f71b302",
  type: "page-type/world-character",
  slug: "rosech",
  title: "Rosech",
  world: "world/the-wandering-inn",
  firstChapter: 677,
  lastChapter: 685,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
