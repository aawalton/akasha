import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const fetohep = {
  id: "01a0b70a-8331-74ff-bd00-c09f5291cc6c",
  type: "page-type/world-character",
  slug: "fetohep",
  title: "Fetohep",
  world: "world/the-wandering-inn",
  firstChapter: 370,
  lastChapter: 809,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
