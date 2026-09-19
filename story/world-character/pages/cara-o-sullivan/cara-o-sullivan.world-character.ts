import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const caraOSullivan = {
  id: "01a0b707-952b-74b7-8fcf-08810ad52138",
  type: "page-type/world-character",
  slug: "cara-o-sullivan",
  title: "Cara O'Sullivan",
  world: "world/the-wandering-inn",
  firstChapter: 482,
  lastChapter: 482,
  characterClaims: "jsonl",
  aliasOf: "world-character/cara-osullivan",
} as const satisfies WorldCharacter
