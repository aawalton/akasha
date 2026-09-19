import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const belavierrDonamia = {
  id: "01a0b707-7f67-74b1-bdda-72f48a84ffd6",
  type: "page-type/world-character",
  slug: "belavierr-donamia",
  title: "Belavierr Donamia",
  world: "world/the-wandering-inn",
  firstChapter: 586,
  lastChapter: 586,
  characterClaims: "jsonl",
  aliasOf: "world-character/belavierr",
} as const satisfies WorldCharacter
