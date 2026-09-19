import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const akrisaSilverfang = {
  id: "01a0b707-66b9-7d52-bb9d-095e35edd0a3",
  type: "page-type/world-character",
  slug: "akrisa-silverfang",
  title: "Akrisa Silverfang",
  world: "world/the-wandering-inn",
  firstChapter: 807,
  lastChapter: 807,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
