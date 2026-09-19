import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const asoma = {
  id: "01a0b707-7562-7ccb-b2c2-f24141877861",
  type: "page-type/world-character",
  slug: "asoma",
  title: "Asoma",
  world: "world/the-wandering-inn",
  firstChapter: 460,
  lastChapter: 460,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
