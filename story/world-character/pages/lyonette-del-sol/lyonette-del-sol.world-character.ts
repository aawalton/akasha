import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lyonetteDelSol = {
  id: "01a0b70b-92e5-7e40-bf5e-77580d377053",
  type: "page-type/world-character",
  slug: "lyonette-del-sol",
  title: "Lyonette del Sol",
  world: "world/the-wandering-inn",
  firstChapter: 812,
  lastChapter: 812,
  characterClaims: "jsonl",
  aliasOf: "world-character/lyonette-du-marquin",
} as const satisfies WorldCharacter
