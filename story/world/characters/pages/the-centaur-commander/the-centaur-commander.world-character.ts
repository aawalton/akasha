import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theCentaurCommander = {
  id: "01a0b70d-1bb7-7ba5-abfe-f6a58971b471",
  type: "page-type/world-character",
  slug: "the-centaur-commander",
  title: "the Centaur commander",
  world: "world/the-wandering-inn",
  firstChapter: 197,
  lastChapter: 197,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
