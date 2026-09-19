import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const imorSeagrass = {
  id: "01a0b70b-0b16-7c5c-bd25-e5c0f66f8d73",
  type: "page-type/world-character",
  slug: "imor-seagrass",
  title: "Imor Seagrass",
  world: "world/the-wandering-inn",
  firstChapter: 686,
  lastChapter: 686,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
