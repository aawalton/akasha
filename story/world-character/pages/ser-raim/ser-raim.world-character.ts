import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const serRaim = {
  id: "01a0b70c-f43b-70cb-9091-5b8ff1d5f980",
  type: "page-type/world-character",
  slug: "ser-raim",
  title: "Ser Raim",
  world: "world/the-wandering-inn",
  firstChapter: 358,
  lastChapter: 422,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
