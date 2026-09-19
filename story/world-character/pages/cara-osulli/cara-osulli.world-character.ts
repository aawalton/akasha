import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const caraOsulli = {
  id: "01a0b707-955a-799f-ac90-b2142fa0fc00",
  type: "page-type/world-character",
  slug: "cara-osulli",
  title: "Cara O'Sullivan",
  world: "world/the-wandering-inn",
  firstChapter: 777,
  lastChapter: 777,
  characterClaims: "jsonl",
  aliasOf: "world-character/cara-osullivan",
} as const satisfies WorldCharacter
