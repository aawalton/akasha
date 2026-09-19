import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const emilyFranson = {
  id: "01a0b70a-6ba4-74f2-9573-aa5759ac97b7",
  type: "page-type/world-character",
  slug: "emily-franson",
  title: "Emily Franson",
  world: "world/the-wandering-inn",
  firstChapter: 775,
  lastChapter: 775,
} as const satisfies WorldCharacter
