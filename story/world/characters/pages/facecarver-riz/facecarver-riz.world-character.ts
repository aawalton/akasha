import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const facecarverRiz = {
  id: "01a0b70a-787c-7314-97d3-45d8e02d9fc1",
  type: "page-type/world-character",
  slug: "facecarver-riz",
  title: "Facecarver Riz",
  world: "world/the-wandering-inn",
  firstChapter: 752,
  lastChapter: 752,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
