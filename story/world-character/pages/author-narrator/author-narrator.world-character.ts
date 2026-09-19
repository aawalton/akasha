import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const authorNarrator = {
  id: "01a0b707-7607-7bac-9a5e-76acc32f8e44",
  type: "page-type/world-character",
  slug: "author-narrator",
  title: "The Author",
  world: "world/the-wandering-inn",
  firstChapter: 766,
  lastChapter: 766,
} as const satisfies WorldCharacter
