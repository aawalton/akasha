import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goshawe = {
  id: "01a0b70a-e64e-733b-b634-ae7f980f25a6",
  type: "page-type/world-character",
  slug: "goshawe",
  title: "Goshawe",
  world: "world/the-wandering-inn",
  firstChapter: 775,
  lastChapter: 775,
} as const satisfies WorldCharacter
